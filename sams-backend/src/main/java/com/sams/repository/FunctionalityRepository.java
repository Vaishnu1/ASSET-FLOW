package com.sams.repository;

import com.sams.entity.Functionality;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FunctionalityRepository extends JpaRepository<Functionality, Long> {
}