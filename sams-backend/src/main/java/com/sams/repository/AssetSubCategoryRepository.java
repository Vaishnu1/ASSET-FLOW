package com.sams.repository;

import com.sams.entity.AssetSubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetSubCategoryRepository extends JpaRepository<AssetSubCategory, Long> {
}