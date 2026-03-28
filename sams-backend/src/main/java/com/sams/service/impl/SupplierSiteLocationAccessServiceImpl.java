package com.sams.service.impl;

import com.sams.dto.SupplierSiteLocationAccessDTO;
import com.sams.entity.SupplierSiteLocationAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierSiteLocationAccessRepository;
import com.sams.service.SupplierSiteLocationAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierSiteLocationAccessServiceImpl implements SupplierSiteLocationAccessService {

    private final SupplierSiteLocationAccessRepository repository;

    @Override
    @Transactional
    public SupplierSiteLocationAccessDTO create(SupplierSiteLocationAccessDTO dto) {
        SupplierSiteLocationAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierSiteLocationAccessDTO getById(Long id) {
        SupplierSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteLocationAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierSiteLocationAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierSiteLocationAccessDTO update(Long id, SupplierSiteLocationAccessDTO dto) {
        SupplierSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteLocationAccess not found with ID: " + id));
        SupplierSiteLocationAccess mapped = mapToEntity(dto);
        mapped.setSupplierSiteAccessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierSiteLocationAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteLocationAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierSiteLocationAccess mapToEntity(SupplierSiteLocationAccessDTO dto) {
        SupplierSiteLocationAccess entity = new SupplierSiteLocationAccess();
        entity.setSupplierSiteAccessId(dto.getSupplierSiteAccessId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setAccessLocationId(dto.getAccessLocationId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierSiteLocationAccessDTO mapToDTO(SupplierSiteLocationAccess entity) {
        SupplierSiteLocationAccessDTO dto = new SupplierSiteLocationAccessDTO();
        dto.setSupplierSiteAccessId(entity.getSupplierSiteAccessId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setAccessLocationId(entity.getAccessLocationId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}