package com.balatechdev.portfolio.contact;

import com.balatechdev.portfolio.common.dto.PageResponse;
import com.balatechdev.portfolio.contact.dto.ContactMessageResponse;
import com.balatechdev.portfolio.contact.dto.ReadStatusRequest;
import com.balatechdev.portfolio.contact.dto.UnreadCountResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/contact-messages")
public class AdminContactController {

    private final ContactService service;

    public AdminContactController(ContactService service) {
        this.service = service;
    }

    // GET /api/v1/admin/contact-messages?page=0&size=20&unreadOnly=true
    @GetMapping
    public PageResponse<ContactMessageResponse> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "false") boolean unreadOnly) {
        return service.findAll(page, size, unreadOnly);
    }

    @GetMapping("/unread-count")
    public UnreadCountResponse unreadCount() {
        return new UnreadCountResponse(service.unreadCount());
    }

    @GetMapping("/{id}")
    public ContactMessageResponse getOne(@PathVariable Long id) {
        return service.findById(id);
    }

    // Body: {"read": true} or {"read": false}
    @PatchMapping("/{id}/read")
    public ContactMessageResponse setRead(@PathVariable Long id, @Valid @RequestBody ReadStatusRequest request) {
        return service.setRead(id, request.read());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}