package com.sams.repository;

import com.sams.entity.C1;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface C1Repository extends JpaRepository<C1, Long> {
}