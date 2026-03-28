package com.sams.repository;

import com.sams.entity.EmpLoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpLocRepository extends JpaRepository<EmpLoc, Long> {
}