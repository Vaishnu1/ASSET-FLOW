package com.sams.repository;

import com.sams.entity.SrFunctionality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrFunctionalityRepository extends JpaRepository<SrFunctionality, Long> {
}