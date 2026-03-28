package com.sams.repository;

import com.sams.entity.PoPriceHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PoPriceHdrRepository extends JpaRepository<PoPriceHdr, Long> {
}