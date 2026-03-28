package com.sams.repository;

import com.sams.entity.AssetAssignee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetAssigneeRepository extends JpaRepository<AssetAssignee, Long> {
}