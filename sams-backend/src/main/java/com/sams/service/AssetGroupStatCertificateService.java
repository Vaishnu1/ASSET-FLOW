package com.sams.service;

import com.sams.dto.AssetGroupStatCertificateDTO;
import java.util.List;

public interface AssetGroupStatCertificateService {
    AssetGroupStatCertificateDTO create(AssetGroupStatCertificateDTO dto);
    AssetGroupStatCertificateDTO getById(Long id);
    List<AssetGroupStatCertificateDTO> getAll();
    AssetGroupStatCertificateDTO update(Long id, AssetGroupStatCertificateDTO dto);
    void delete(Long id);
}