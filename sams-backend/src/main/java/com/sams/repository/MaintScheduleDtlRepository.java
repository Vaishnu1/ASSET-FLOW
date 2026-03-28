package com.sams.repository;

import com.sams.entity.MaintScheduleDtl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaintScheduleDtlRepository extends JpaRepository<MaintScheduleDtl, Long> {
}