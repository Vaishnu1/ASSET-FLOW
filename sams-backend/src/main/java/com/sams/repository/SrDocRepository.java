package com.sams.repository;

import com.sams.entity.SrDoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrDocRepository extends JpaRepository<SrDoc, Long> {
}