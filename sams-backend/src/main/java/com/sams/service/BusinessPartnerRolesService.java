package com.sams.service;

import com.sams.dto.BusinessPartnerRolesDTO;
import java.util.List;

public interface BusinessPartnerRolesService {
    BusinessPartnerRolesDTO create(BusinessPartnerRolesDTO dto);
    BusinessPartnerRolesDTO getById(Long id);
    List<BusinessPartnerRolesDTO> getAll();
    BusinessPartnerRolesDTO update(Long id, BusinessPartnerRolesDTO dto);
    void delete(Long id);
}