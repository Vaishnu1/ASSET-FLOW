package com.sams.repository;

import com.sams.entity.LanguageCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LanguageCodeRepository extends JpaRepository<LanguageCode, Long> {
}