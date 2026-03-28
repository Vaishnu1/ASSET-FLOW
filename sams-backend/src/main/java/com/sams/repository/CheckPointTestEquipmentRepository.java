package com.sams.repository;

import com.sams.entity.CheckPointTestEquipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CheckPointTestEquipmentRepository extends JpaRepository<CheckPointTestEquipment, Long> {
}