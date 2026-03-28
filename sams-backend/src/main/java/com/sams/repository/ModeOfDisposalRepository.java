package com.sams.repository;

import com.sams.entity.ModeOfDisposal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ModeOfDisposalRepository extends JpaRepository<ModeOfDisposal, Long> {
}