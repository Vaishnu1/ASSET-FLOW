package com.sams.repository;

import com.sams.entity.PoTcTriggerEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoTcTriggerEventRepository extends JpaRepository<PoTcTriggerEvent, Long> {
}