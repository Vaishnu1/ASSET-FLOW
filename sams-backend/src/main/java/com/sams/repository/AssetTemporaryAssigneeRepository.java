package com.sams.repository;

import com.sams.entity.AssetTemporaryAssignee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetTemporaryAssigneeRepository extends JpaRepository<AssetTemporaryAssignee, Long> {
}