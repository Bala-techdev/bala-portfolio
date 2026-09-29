package com.balatechdev.portfolio.contact.dto;

import com.balatechdev.portfolio.contact.ContactMessage;

public final class ContactMapper {

    private ContactMapper() {
    }

    public static ContactMessageResponse toResponse(ContactMessage entity) {
        return new ContactMessageResponse(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getMessage(),
                entity.isRead(),
                entity.getCreatedAt());
    }
}