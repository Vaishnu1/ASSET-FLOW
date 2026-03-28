package com.sams.repository;

import com.sams.entity.ReferenceEmailServiceDb;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReferenceEmailServiceDbRepository extends JpaRepository<ReferenceEmailServiceDb, Long> {
}