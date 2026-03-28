package com.sams.service.impl;

import com.sams.dto.CustomerSiteRegDTO;
import com.sams.entity.CustomerSiteReg;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomerSiteRegRepository;
import com.sams.service.CustomerSiteRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerSiteRegServiceImpl implements CustomerSiteRegService {

    private final CustomerSiteRegRepository repository;

    @Override
    @Transactional
    public CustomerSiteRegDTO create(CustomerSiteRegDTO dto) {
        CustomerSiteReg entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomerSiteRegDTO getById(Long id) {
        CustomerSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteReg not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomerSiteRegDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerSiteRegDTO update(Long id, CustomerSiteRegDTO dto) {
        CustomerSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteReg not found with ID: " + id));
        CustomerSiteReg mapped = mapToEntity(dto);
        mapped.setCustomerSiteRegId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CustomerSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteReg not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomerSiteReg mapToEntity(CustomerSiteRegDTO dto) {
        CustomerSiteReg entity = new CustomerSiteReg();
        entity.setCustomerSiteRegId(dto.getCustomerSiteRegId());
        entity.setRegistrationName(dto.getRegistrationName());
        entity.setRegistrationNo(dto.getRegistrationNo());
        entity.setCustomerSiteId(dto.getCustomerSiteId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CustomerSiteRegDTO mapToDTO(CustomerSiteReg entity) {
        CustomerSiteRegDTO dto = new CustomerSiteRegDTO();
        dto.setCustomerSiteRegId(entity.getCustomerSiteRegId());
        dto.setRegistrationName(entity.getRegistrationName());
        dto.setRegistrationNo(entity.getRegistrationNo());
        dto.setCustomerSiteId(entity.getCustomerSiteId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}