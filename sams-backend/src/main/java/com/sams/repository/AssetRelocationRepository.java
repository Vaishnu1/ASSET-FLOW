package com.sams.repository;

import com.sams.entity.AssetRelocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRelocationRepository extends JpaRepository<AssetRelocation, Long> {
}