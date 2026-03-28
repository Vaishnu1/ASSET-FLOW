package com.sams.service;

import com.sams.dto.CertificateDTO;
import java.util.List;

public interface CertificateService {
    CertificateDTO createCertificate(CertificateDTO dto);
    CertificateDTO getCertificateById(Long id);
    List<CertificateDTO> getAllCertificates();
    CertificateDTO updateCertificate(Long id, CertificateDTO dto);
    void deleteCertificate(Long id);
}