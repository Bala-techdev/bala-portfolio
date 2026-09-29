package com.balatechdev.portfolio.contact;

import com.balatechdev.portfolio.common.dto.PageResponse;
import com.balatechdev.portfolio.common.exception.ResourceNotFoundException;
import com.balatechdev.portfolio.contact.dto.ContactMapper;
import com.balatechdev.portfolio.contact.dto.ContactMessageRequest;
import com.balatechdev.portfolio.contact.dto.ContactMessageResponse;
import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private static final int MAX_PAGE_SIZE = 50;

    private final ContactMessageRepository repository;
    private final ContactRateLimiter rateLimiter;

    public ContactService(ContactMessageRepository repository, ContactRateLimiter rateLimiter) {
        this.repository = repository;
        this.rateLimiter = rateLimiter;
    }

    // ---------- Public ----------

    @Transactional
    public void submit(ContactMessageRequest request, String clientIp) {
        // Honeypot: pretend it worked so the bot learns nothing, but save nothing.
        if (request.website() != null && !request.website().isBlank()) {
            log.info("Discarded a contact submission that filled the honeypot field");
            return;
        }

        rateLimiter.checkAndRecord(clientIp);

        repository.save(new ContactMessage(
                request.name().trim(),
                request.email().trim().toLowerCase(Locale.ROOT),
                request.message().trim()));
    }

    // ---------- Admin ----------

    public PageResponse<ContactMessageResponse> findAll(int page, int size, boolean unreadOnly) {
        Pageable pageable = PageRequest.of(
                Math.max(page, 0),
                Math.min(Math.max(size, 1), MAX_PAGE_SIZE),
                Sort.by(Sort.Order.desc("createdAt"), Sort.Order.desc("id")));

        Page<ContactMessage> result = unreadOnly
                ? repository.findAllByReadFalse(pageable)
                : repository.findAll(pageable);
        return PageResponse.from(result.map(ContactMapper::toResponse));
    }

    public ContactMessageResponse findById(Long id) {
        return ContactMapper.toResponse(getOrThrow(id));
    }

    public long unreadCount() {
        return repository.countByReadFalse();
    }

    @Transactional
    public ContactMessageResponse setRead(Long id, boolean read) {
        ContactMessage message = getOrThrow(id);
        message.markRead(read);
        return ContactMapper.toResponse(message);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Contact message", id);
        }
        repository.deleteById(id);
    }

    private ContactMessage getOrThrow(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Contact message", id));
    }
}