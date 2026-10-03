package com.balatechdev.portfolio.config;

import java.util.Base64;
import java.util.List;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.nimbusds.jose.jwk.OctetSequenceKey;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

@Configuration
@EnableWebSecurity
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfig {

    private final JwtProperties jwtProperties;

    public SecurityConfig(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(
            UserDetailsService userDetailsService,
            PasswordEncoder passwordEncoder) {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider(passwordEncoder);

        provider.setUserDetailsService(userDetailsService);

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config) throws Exception {

        return config.getAuthenticationManager();
    }

    private SecretKey jwtSecretKey() {
        byte[] keyBytes = Base64.getDecoder().decode(jwtProperties.secret());
        return new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    @Bean
    public JwtEncoder jwtEncoder() {
        OctetSequenceKey key =
                new OctetSequenceKey.Builder(jwtSecretKey()).build();

        return new NimbusJwtEncoder(
                new ImmutableSecret<>(key.toSecretKey())
        );
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withSecretKey(jwtSecretKey())
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    /*
     * Reads the "roles" claim and converts roles such as:
     *
     * ADMIN
     *
     * into:
     *
     * ROLE_ADMIN
     *
     * This allows:
     *
     * @PreAuthorize("hasRole('ADMIN')")
     *
     * to work correctly.
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {

        JwtGrantedAuthoritiesConverter authoritiesConverter =
                new JwtGrantedAuthoritiesConverter();

        authoritiesConverter.setAuthoritiesClaimName("roles");
        authoritiesConverter.setAuthorityPrefix("");
        authoritiesConverter.setAuthoritiesClaimDelimiter(",");

        SimpleAuthorityMapper roleMapper =
                new SimpleAuthorityMapper();

        roleMapper.setPrefix("ROLE_");

        JwtAuthenticationConverter converter =
                new JwtAuthenticationConverter();

        converter.setJwtGrantedAuthoritiesConverter(
                jwt -> roleMapper.mapAuthorities(
                        authoritiesConverter.convert(jwt)
                )
        );

        return converter;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource(
            org.springframework.core.env.Environment env) {

        String origins = env.getProperty(
                "app.cors.allowed-origins",
                "http://localhost:5173"
        );

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(
                List.of(origins.split(","))
        );

        config.setAllowedMethods(
                List.of(
                        "GET",
                        "POST",
                        "PUT",
                        "PATCH",
                        "DELETE",
                        "OPTIONS"
                )
        );

        config.setAllowedHeaders(
                List.of(
                        "Authorization",
                        "Content-Type"
                )
        );

        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
                "/**",
                config
        );

        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http,
            JwtAuthenticationConverter jwtAuthenticationConverter,
            CorsConfigurationSource corsConfigurationSource)
            throws Exception {

        http
                .cors(cors ->
                        cors.configurationSource(
                                corsConfigurationSource
                        )
                )

                .csrf(AbstractHttpConfigurer::disable)

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth ->
                        auth

                                .requestMatchers(
                                        "/actuator/health",
                                        "/actuator/info"
                                )
                                .permitAll()

                                .requestMatchers(
                                        "/api/v1/auth/login"
                                )
                                .permitAll()

                                // Admin endpoints require ADMIN role.
                                .requestMatchers(
                                        "/api/v1/admin/**"
                                )
                                .hasRole("ADMIN")

                                // Public GET endpoints.
                                .requestMatchers(
                                        org.springframework.http.HttpMethod.GET,
                                        "/api/v1/**"
                                )
                                .permitAll()

                                // Public contact form.
                                .requestMatchers(
                                        org.springframework.http.HttpMethod.POST,
                                        "/api/v1/contact"
                                )
                                .permitAll()

                                .anyRequest()
                                .denyAll()
                )

                .oauth2ResourceServer(oauth2 ->
                        oauth2.jwt(jwt ->
                                jwt.jwtAuthenticationConverter(
                                        jwtAuthenticationConverter
                                )
                        )
                );

        return http.build();
    }
}