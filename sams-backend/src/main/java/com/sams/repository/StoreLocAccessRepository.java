package com.sams.repository;

import com.sams.entity.StoreLocAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreLocAccessRepository extends JpaRepository<StoreLocAccess, Long> {
}