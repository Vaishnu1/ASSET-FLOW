package com.sams.repository;

import com.sams.entity.ItemTransactions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTransactionsRepository extends JpaRepository<ItemTransactions, Long> {
}