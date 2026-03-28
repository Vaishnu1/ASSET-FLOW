package com.sams.repository;

import com.sams.entity.ItemApprovedSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemApprovedSupplierRepository extends JpaRepository<ItemApprovedSupplier, Long> {
}