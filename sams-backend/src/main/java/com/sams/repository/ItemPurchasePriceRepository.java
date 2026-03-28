package com.sams.repository;

import com.sams.entity.ItemPurchasePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemPurchasePriceRepository extends JpaRepository<ItemPurchasePrice, Long> {
}