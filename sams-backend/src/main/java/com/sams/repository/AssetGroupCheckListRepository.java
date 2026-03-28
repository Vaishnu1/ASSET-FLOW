package com.sams.repository;

import com.sams.entity.AssetGroupCheckList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetGroupCheckListRepository extends JpaRepository<AssetGroupCheckList, Long> {
}