package com.sams.repository;

import com.sams.entity.ItemBranchMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemBranchMappingRepository extends JpaRepository<ItemBranchMapping, Long> {
}