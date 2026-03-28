package com.sams.service.impl;

import com.sams.dto.ManufacturerSupplierDTO;
import com.sams.entity.ManufacturerSupplier;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ManufacturerSupplierRepository;
import com.sams.service.ManufacturerSupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManufacturerSupplierServiceImpl implements ManufacturerSupplierService {

    private final ManufacturerSupplierRepository repository;

    @Override
    @Transactional
    public ManufacturerSupplierDTO create(ManufacturerSupplierDTO dto) {
        ManufacturerSupplier entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ManufacturerSupplierDTO getById(Long id) {
        ManufacturerSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerSupplier not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ManufacturerSupplierDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ManufacturerSupplierDTO update(Long id, ManufacturerSupplierDTO dto) {
        ManufacturerSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerSupplier not found with ID: " + id));
        ManufacturerSupplier mapped = mapToEntity(dto);
        mapped.setManufacturerSupplierId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ManufacturerSupplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerSupplier not found with ID: " + id));
        repository.delete(entity);
    }

    private ManufacturerSupplier mapToEntity(ManufacturerSupplierDTO dto) {
        ManufacturerSupplier entity = new ManufacturerSupplier();
        entity.setManufacturerSupplierId(dto.getManufacturerSupplierId());
        entity.setOrgId(dto.getOrgId());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ManufacturerSupplierDTO mapToDTO(ManufacturerSupplier entity) {
        ManufacturerSupplierDTO dto = new ManufacturerSupplierDTO();
        dto.setManufacturerSupplierId(entity.getManufacturerSupplierId());
        dto.setOrgId(entity.getOrgId());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}