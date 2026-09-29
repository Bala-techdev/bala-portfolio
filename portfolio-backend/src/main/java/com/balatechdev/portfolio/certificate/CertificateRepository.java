package com.balatechdev.portfolio.certificate;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    List<Certificate> findAllByOrderByDisplayOrderAsc();
}