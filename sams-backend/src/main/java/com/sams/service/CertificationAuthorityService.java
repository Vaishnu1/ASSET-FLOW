package com.sams.service;

import com.sams.dto.CertificationAuthorityDTO;
import java.util.List;

public interface CertificationAuthorityService {
    CertificationAuthorityDTO createCertificationAuthority(CertificationAuthorityDTO dto);
    CertificationAuthorityDTO getCertificationAuthorityById(Long id);
    List<CertificationAuthorityDTO> getAllCertificationAuthorities();
    CertificationAuthorityDTO updateCertificationAuthority(Long id, CertificationAuthorityDTO dto);
    void deleteCertificationAuthority(Long id);
}