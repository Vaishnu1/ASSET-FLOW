package com.sams.repository;

import com.sams.entity.SrReOpened;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrReOpenedRepository extends JpaRepository<SrReOpened, Long> {
}