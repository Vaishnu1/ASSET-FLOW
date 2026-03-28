package com.sams.repository;

import com.sams.entity.NumberControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberControlRepository extends JpaRepository<NumberControl, Long> {
}