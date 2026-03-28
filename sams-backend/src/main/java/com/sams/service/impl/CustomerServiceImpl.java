package com.sams.service.impl;

import com.sams.dto.CustomerDTO;
import com.sams.entity.Customer;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomerRepository;
import com.sams.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository repository;

    @Override
    @Transactional
    public CustomerDTO createCustomer(CustomerDTO dto) {
        Customer entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomerDTO getCustomerById(Long id) {
        Customer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        Customer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Customer mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteCustomer(Long id) {
        Customer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not found with ID: " + id));
        repository.delete(entity);
    }

    private Customer mapToEntity(CustomerDTO dto) {
        Customer entity = new Customer();
        entity.setCustomerId(dto.getCustomerId());
        entity.setCustomerName(dto.getCustomerName());
        entity.setCustomerCode(dto.getCustomerCode());
        entity.setCustomerSiteList(dto.getCustomerSiteList());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setActive(dto.getActive());
        entity.setOrgId(dto.getOrgId());
        entity.setCustomerArea(dto.getCustomerArea());
        entity.setCustomerCity(dto.getCustomerCity());
        entity.setCustomerState(dto.getCustomerState());
        entity.setCustomerCountry(dto.getCustomerCountry());
        entity.setCustomerCountryId(dto.getCustomerCountryId());
        entity.setActiveDisp(dto.getActiveDisp());
        entity.setActiveDisplay(dto.getActiveDisplay());
        entity.setCustomerSiteName(dto.getCustomerSiteName());
        entity.setCustomerSinceDtDisp(dto.getCustomerSinceDtDisp());
        entity.setCustomerSinceDt(dto.getCustomerSinceDt());
        entity.setActiveYOrN(dto.getActiveYOrN());
        entity.setContactPersonNo(dto.getContactPersonNo());
        return entity;
    }

    private CustomerDTO mapToDTO(Customer entity) {
        CustomerDTO dto = new CustomerDTO();
        dto.setId(entity.getId());
        dto.setCustomerId(entity.getCustomerId());
        dto.setCustomerName(entity.getCustomerName());
        dto.setCustomerCode(entity.getCustomerCode());
        dto.setCustomerSiteList(entity.getCustomerSiteList());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setActive(entity.getActive());
        dto.setOrgId(entity.getOrgId());
        dto.setCustomerArea(entity.getCustomerArea());
        dto.setCustomerCity(entity.getCustomerCity());
        dto.setCustomerState(entity.getCustomerState());
        dto.setCustomerCountry(entity.getCustomerCountry());
        dto.setCustomerCountryId(entity.getCustomerCountryId());
        dto.setActiveDisp(entity.getActiveDisp());
        dto.setActiveDisplay(entity.getActiveDisplay());
        dto.setCustomerSiteName(entity.getCustomerSiteName());
        dto.setCustomerSinceDtDisp(entity.getCustomerSinceDtDisp());
        dto.setCustomerSinceDt(entity.getCustomerSinceDt());
        dto.setActiveYOrN(entity.getActiveYOrN());
        dto.setContactPersonNo(entity.getContactPersonNo());
        return dto;
    }
}