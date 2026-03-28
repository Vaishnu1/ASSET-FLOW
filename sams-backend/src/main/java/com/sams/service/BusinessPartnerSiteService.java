package com.sams.service;

import com.sams.dto.BusinessPartnerSiteDTO;
import java.util.List;

public interface BusinessPartnerSiteService {
    BusinessPartnerSiteDTO create(BusinessPartnerSiteDTO dto);
    BusinessPartnerSiteDTO getById(Long id);
    List<BusinessPartnerSiteDTO> getAll();
    BusinessPartnerSiteDTO update(Long id, BusinessPartnerSiteDTO dto);
    void delete(Long id);
}