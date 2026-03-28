package com.sams.service;

import com.sams.dto.CustomerSiteDTO;
import java.util.List;

public interface CustomerSiteService {
    CustomerSiteDTO createCustomerSite(CustomerSiteDTO dto);
    CustomerSiteDTO getCustomerSiteById(Long id);
    List<CustomerSiteDTO> getAllCustomerSites();
    CustomerSiteDTO updateCustomerSite(Long id, CustomerSiteDTO dto);
    void deleteCustomerSite(Long id);
}