package com.sams.repository;

import com.sams.entity.EmailSenderIdQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailSenderIdQueryRepository extends JpaRepository<EmailSenderIdQuery, Long> {
}