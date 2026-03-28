package com.sams.repository;

import com.sams.entity.NumberControlCd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NumberControlCdRepository extends JpaRepository<NumberControlCd, Long> {
}