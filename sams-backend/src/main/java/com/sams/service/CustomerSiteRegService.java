package com.sams.service;

import com.sams.dto.CustomerSiteRegDTO;
import java.util.List;

public interface CustomerSiteRegService {
    CustomerSiteRegDTO create(CustomerSiteRegDTO dto);
    CustomerSiteRegDTO getById(Long id);
    List<CustomerSiteRegDTO> getAll();
    CustomerSiteRegDTO update(Long id, CustomerSiteRegDTO dto);
    void delete(Long id);
}