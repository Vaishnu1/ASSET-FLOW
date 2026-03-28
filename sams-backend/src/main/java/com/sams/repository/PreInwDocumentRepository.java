package com.sams.repository;

import com.sams.entity.PreInwDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreInwDocumentRepository extends JpaRepository<PreInwDocument, Long> {
}