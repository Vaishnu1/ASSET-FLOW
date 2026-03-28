package com.sams.repository;

import com.sams.entity.AssetCustomFieldsValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetCustomFieldsValueRepository extends JpaRepository<AssetCustomFieldsValue, Long> {
}