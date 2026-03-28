package com.sams.service;

import com.sams.dto.BusinessPartnerContactDTO;
import java.util.List;

public interface BusinessPartnerContactService {
    BusinessPartnerContactDTO create(BusinessPartnerContactDTO dto);
    BusinessPartnerContactDTO getById(Long id);
    List<BusinessPartnerContactDTO> getAll();
    BusinessPartnerContactDTO update(Long id, BusinessPartnerContactDTO dto);
    void delete(Long id);
}