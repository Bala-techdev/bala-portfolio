package com.balatechdev.portfolio.auth.dto;

public record LoginResponse(String accessToken, String tokenType, long expiresInMinutes) {
}