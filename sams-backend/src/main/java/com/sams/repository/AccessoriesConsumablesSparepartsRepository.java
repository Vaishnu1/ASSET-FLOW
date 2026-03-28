package com.sams.repository;

import com.sams.entity.AccessoriesConsumablesSpareparts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessoriesConsumablesSparepartsRepository extends JpaRepository<AccessoriesConsumablesSpareparts, Long> {
}