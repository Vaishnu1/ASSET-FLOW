package com.sams.repository;

import com.sams.entity.PrUnapprovedItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PrUnapprovedItemRepository extends JpaRepository<PrUnapprovedItem, Long> {
}