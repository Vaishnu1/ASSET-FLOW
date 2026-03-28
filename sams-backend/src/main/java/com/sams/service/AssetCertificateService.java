package com.sams.service;

import com.sams.dto.AssetCertificateDTO;
import java.util.List;

public interface AssetCertificateService {
    AssetCertificateDTO create(AssetCertificateDTO dto);
    AssetCertificateDTO getById(Long id);
    List<AssetCertificateDTO> getAll();
    AssetCertificateDTO update(Long id, AssetCertificateDTO dto);
    void delete(Long id);
}