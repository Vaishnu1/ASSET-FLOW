package com.sams.repository;

import com.sams.entity.CusFieldHdr;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CusFieldHdrRepository extends JpaRepository<CusFieldHdr, Long> {
}