package com.sams.repository;

import com.sams.entity.ItemModule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemModuleRepository extends JpaRepository<ItemModule, Long> {
}