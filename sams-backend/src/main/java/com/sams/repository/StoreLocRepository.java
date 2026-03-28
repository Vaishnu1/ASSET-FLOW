package com.sams.repository;

import com.sams.entity.StoreLoc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreLocRepository extends JpaRepository<StoreLoc, Long> {
}