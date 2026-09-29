package com.balatechdev.portfolio.contact;

import com.balatechdev.portfolio.contact.dto.ContactAcknowledgement;
import com.balatechdev.portfolio.contact.dto.ContactMessageRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contact")
public class ContactController {

    private final ContactService service;

    public ContactController(ContactService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ContactAcknowledgement submit(
            @Valid @RequestBody ContactMessageRequest request, HttpServletRequest http) {
        service.submit(request, http.getRemoteAddr());
        return new ContactAcknowledgement("Thanks! Your message has been received.");
    }
}