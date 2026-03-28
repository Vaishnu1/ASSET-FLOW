package com.sams.service;

import com.sams.dto.BusinessPartnerDTO;
import java.util.List;

public interface BusinessPartnerService {
    BusinessPartnerDTO createBusinessPartner(BusinessPartnerDTO dto);
    BusinessPartnerDTO getBusinessPartnerById(Long id);
    List<BusinessPartnerDTO> getAllBusinessPartners();
    BusinessPartnerDTO updateBusinessPartner(Long id, BusinessPartnerDTO dto);
    void deleteBusinessPartner(Long id);
}