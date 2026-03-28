package com.sams.repository;

import com.sams.entity.DbVersion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DbVersionRepository extends JpaRepository<DbVersion, Long> {
}