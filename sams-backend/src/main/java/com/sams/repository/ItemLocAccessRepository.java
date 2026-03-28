package com.sams.repository;

import com.sams.entity.ItemLocAccess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemLocAccessRepository extends JpaRepository<ItemLocAccess, Long> {
}