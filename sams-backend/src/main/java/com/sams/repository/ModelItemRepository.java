package com.sams.repository;

import com.sams.entity.ModelItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelItemRepository extends JpaRepository<ModelItem, Long> {
}