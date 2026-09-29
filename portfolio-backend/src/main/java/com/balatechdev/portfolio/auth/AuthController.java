package com.balatechdev.portfolio.auth;

import com.balatechdev.portfolio.auth.dto.LoginRequest ;
import com.balatechdev.portfolio.auth.dto.LoginResponse;
import com.balatechdev.portfolio.config.JwtProperties ;
import jakarta.validation.Valid;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;
    private final JwtProperties jwtProperties;

    public AuthController(
            AuthenticationManager authenticationManager,
            TokenService tokenService,
            JwtProperties jwtProperties) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.jwtProperties = jwtProperties;
    }

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        } catch (org.springframework.security.core.AuthenticationException ex) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String token = tokenService.issueToken(request.username());
        return new LoginResponse(token, "Bearer", jwtProperties.expirationMinutes());
    }
}