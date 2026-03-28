package com.sams.repository;

import com.sams.entity.GrnDocuments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrnDocumentsRepository extends JpaRepository<GrnDocuments, Long> {
}