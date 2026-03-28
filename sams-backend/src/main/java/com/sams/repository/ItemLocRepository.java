package com.sams.repository;

import com.sams.entity.ItemLoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemLocRepository extends JpaRepository<ItemLoc, Long> {
}