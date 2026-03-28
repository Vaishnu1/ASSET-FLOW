package com.sams.repository;

import com.sams.entity.Uom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UomRepository extends JpaRepository<Uom, Long> {
}