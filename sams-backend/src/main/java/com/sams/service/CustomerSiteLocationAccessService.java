package com.sams.service;

import com.sams.dto.CustomerSiteLocationAccessDTO;
import java.util.List;

public interface CustomerSiteLocationAccessService {
    CustomerSiteLocationAccessDTO create(CustomerSiteLocationAccessDTO dto);
    CustomerSiteLocationAccessDTO getById(Long id);
    List<CustomerSiteLocationAccessDTO> getAll();
    CustomerSiteLocationAccessDTO update(Long id, CustomerSiteLocationAccessDTO dto);
    void delete(Long id);
}