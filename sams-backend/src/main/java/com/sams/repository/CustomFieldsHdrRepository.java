package com.sams.repository;

import com.sams.entity.CustomFieldsHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomFieldsHdrRepository extends JpaRepository<CustomFieldsHdr, Long> {
}