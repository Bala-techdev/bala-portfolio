package com.balatechdev.portfolio.security;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Stream;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class SecurityRulesIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private JwtEncoder jwtEncoder;

    @Autowired
    private ObjectMapper objectMapper;

    private String adminToken;

    @BeforeEach
    void loginAsAdmin() throws Exception {
        String body = """
                {"username":"testadmin","password":"TestAdminPass123!"}
                """;
        String response = mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        adminToken = objectMapper.readTree(response).get("accessToken").asText();
    }

    static Stream<String> publicGetEndpoints() {
        return Stream.of(
                "/api/v1/education",
                "/api/v1/experience",
                "/api/v1/certificates",
                "/api/v1/skills",
                "/api/v1/projects",
                "/api/v1/blog");
    }

    @ParameterizedTest
    @MethodSource("publicGetEndpoints")
    void publicEndpoints_areReachableWithoutAToken(String path) throws Exception {
        mockMvc.perform(get(path)).andExpect(status().isOk());
    }

    static Stream<String> adminGetEndpoints() {
        return Stream.of(
                "/api/v1/admin/blog",
                "/api/v1/admin/contact-messages");
    }

    @ParameterizedTest
    @MethodSource("adminGetEndpoints")
    void adminEndpoints_rejectRequestsWithNoToken(String path) throws Exception {
        mockMvc.perform(get(path)).andExpect(status().isUnauthorized());
    }

    @ParameterizedTest
    @MethodSource("adminGetEndpoints")
    void adminEndpoints_rejectATokenWithTheWrongRole(String path) throws Exception {
        mockMvc.perform(get(path).header("Authorization", "Bearer " + nonAdminToken()))
                .andExpect(status().isForbidden());
    }

    @ParameterizedTest
    @MethodSource("adminGetEndpoints")
    void adminEndpoints_acceptAValidAdminToken(String path) throws Exception {
        mockMvc.perform(get(path).header("Authorization", "Bearer " + adminToken))
                .andExpect(status().isOk());
    }

    @Test
    void login_withWrongPassword_returns401() throws Exception {
        String body = """
                {"username":"testadmin","password":"WrongPassword!"}
                """;
        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isUnauthorized());
    }

    // Mints a syntactically valid JWT with a role other than ADMIN, to prove the API
    // checks the role carried inside the token, not just whether a token is present.
    private String nonAdminToken() {
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("portfolio-api")
                .issuedAt(now)
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .subject("someone-else")
                .claim("roles", "USER")
                .build();
        JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
        return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
    }
}