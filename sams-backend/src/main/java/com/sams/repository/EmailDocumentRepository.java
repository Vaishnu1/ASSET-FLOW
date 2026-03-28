package com.sams.repository;

import com.sams.entity.EmailDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailDocumentRepository extends JpaRepository<EmailDocument, Long> {
}