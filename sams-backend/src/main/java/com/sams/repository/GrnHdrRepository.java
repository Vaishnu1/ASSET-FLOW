package com.sams.repository;

import com.sams.entity.GrnHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrnHdrRepository extends JpaRepository<GrnHdr, Long> {
}