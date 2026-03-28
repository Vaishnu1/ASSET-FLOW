package com.sams.repository;

import com.sams.entity.ModuleItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModuleItemsRepository extends JpaRepository<ModuleItems, Long> {
}