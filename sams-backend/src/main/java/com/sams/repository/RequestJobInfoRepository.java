package com.sams.repository;

import com.sams.entity.RequestJobInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RequestJobInfoRepository extends JpaRepository<RequestJobInfo, Long> {
}