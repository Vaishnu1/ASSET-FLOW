package com.sams.repository;

import com.sams.entity.StoreType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreTypeRepository extends JpaRepository<StoreType, Long> {
}