package com.sams.repository;

import com.sams.entity.ModelOtherInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModelOtherInfoRepository extends JpaRepository<ModelOtherInfo, Long> {
}