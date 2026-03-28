package com.sams.service;

import com.sams.dto.AdditionalInfoDTO;
import java.util.List;

public interface AdditionalInfoService {
    AdditionalInfoDTO createAdditionalInfo(AdditionalInfoDTO dto);
    AdditionalInfoDTO getAdditionalInfoById(Long id);
    List<AdditionalInfoDTO> getAllAdditionalInfos();
    AdditionalInfoDTO updateAdditionalInfo(Long id, AdditionalInfoDTO dto);
    void deleteAdditionalInfo(Long id);
}