package com.sams.service;

import com.sams.dto.BusinessPartnerRegDTO;
import java.util.List;

public interface BusinessPartnerRegService {
    BusinessPartnerRegDTO create(BusinessPartnerRegDTO dto);
    BusinessPartnerRegDTO getById(Long id);
    List<BusinessPartnerRegDTO> getAll();
    BusinessPartnerRegDTO update(Long id, BusinessPartnerRegDTO dto);
    void delete(Long id);
}