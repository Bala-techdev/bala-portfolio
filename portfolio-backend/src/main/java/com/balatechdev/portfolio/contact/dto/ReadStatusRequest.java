package com.balatechdev.portfolio.contact.dto;

import jakarta.validation.constraints.NotNull;

public record ReadStatusRequest(@NotNull(message = "read is required") Boolean read) {
}