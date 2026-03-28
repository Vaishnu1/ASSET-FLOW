package com.sams.service.impl;

import com.sams.dto.CustomerSiteLocationAccessDTO;
import com.sams.entity.CustomerSiteLocationAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CustomerSiteLocationAccessRepository;
import com.sams.service.CustomerSiteLocationAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerSiteLocationAccessServiceImpl implements CustomerSiteLocationAccessService {

    private final CustomerSiteLocationAccessRepository repository;

    @Override
    @Transactional
    public CustomerSiteLocationAccessDTO create(CustomerSiteLocationAccessDTO dto) {
        CustomerSiteLocationAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CustomerSiteLocationAccessDTO getById(Long id) {
        CustomerSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteLocationAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CustomerSiteLocationAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CustomerSiteLocationAccessDTO update(Long id, CustomerSiteLocationAccessDTO dto) {
        CustomerSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteLocationAccess not found with ID: " + id));
        CustomerSiteLocationAccess mapped = mapToEntity(dto);
        mapped.setCustomerSiteAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CustomerSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CustomerSiteLocationAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private CustomerSiteLocationAccess mapToEntity(CustomerSiteLocationAccessDTO dto) {
        CustomerSiteLocationAccess entity = new CustomerSiteLocationAccess();
        entity.setCustomerSiteAccessId(dto.getCustomerSiteAccessId());
        entity.setCustomerSiteId(dto.getCustomerSiteId());
        entity.setAccessLocationId(dto.getAccessLocationId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CustomerSiteLocationAccessDTO mapToDTO(CustomerSiteLocationAccess entity) {
        CustomerSiteLocationAccessDTO dto = new CustomerSiteLocationAccessDTO();
        dto.setCustomerSiteAccessId(entity.getCustomerSiteAccessId());
        dto.setCustomerSiteId(entity.getCustomerSiteId());
        dto.setAccessLocationId(entity.getAccessLocationId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}