package com.sams.service.impl;

import com.sams.dto.SupplierDTO;
import com.sams.entity.Supplier;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierRepository;
import com.sams.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository repository;

    @Override
    @Transactional
    public SupplierDTO createSupplier(SupplierDTO dto) {
        Supplier entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierDTO getSupplierById(Long id) {
        Supplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierDTO> getAllSuppliers() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierDTO updateSupplier(Long id, SupplierDTO dto) {
        Supplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Supplier mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteSupplier(Long id) {
        Supplier entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + id));
        repository.delete(entity);
    }

    private Supplier mapToEntity(SupplierDTO dto) {
        Supplier entity = new Supplier();
        entity.setSupplierId(dto.getSupplierId());
        entity.setOrgId(dto.getOrgId());
        entity.setOrgName(dto.getOrgName());
        entity.setSupplierName(dto.getSupplierName());
        entity.setSupplierType(dto.getSupplierType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setSupplierLocList(dto.getSupplierLocList());
        entity.setSupplierCode(dto.getSupplierCode());
        entity.setActiveStatusDisp(dto.getActiveStatusDisp());
        entity.setSupSiteState(dto.getSupSiteState());
        entity.setSupplierLocationName(dto.getSupplierLocationName());
        entity.setSupSiteCity(dto.getSupSiteCity());
        entity.setSupSiteArea(dto.getSupSiteArea());
        entity.setActiveDisplay(dto.getActiveDisplay());
        entity.setContactPersonNo(dto.getContactPersonNo());
        entity.setActiveDisp(dto.getActiveDisp());
        entity.setModelsSuppliedList(dto.getModelsSuppliedList());
        entity.setSupCountry(dto.getSupCountry());
        entity.setSupCountryId(dto.getSupCountryId());
        entity.setSupSiteStateId(dto.getSupSiteStateId());
        return entity;
    }

    private SupplierDTO mapToDTO(Supplier entity) {
        SupplierDTO dto = new SupplierDTO();
        dto.setId(entity.getId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setOrgId(entity.getOrgId());
        dto.setOrgName(entity.getOrgName());
        dto.setSupplierName(entity.getSupplierName());
        dto.setSupplierType(entity.getSupplierType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setSupplierLocList(entity.getSupplierLocList());
        dto.setSupplierCode(entity.getSupplierCode());
        dto.setActiveStatusDisp(entity.getActiveStatusDisp());
        dto.setSupSiteState(entity.getSupSiteState());
        dto.setSupplierLocationName(entity.getSupplierLocationName());
        dto.setSupSiteCity(entity.getSupSiteCity());
        dto.setSupSiteArea(entity.getSupSiteArea());
        dto.setActiveDisplay(entity.getActiveDisplay());
        dto.setContactPersonNo(entity.getContactPersonNo());
        dto.setActiveDisp(entity.getActiveDisp());
        dto.setModelsSuppliedList(entity.getModelsSuppliedList());
        dto.setSupCountry(entity.getSupCountry());
        dto.setSupCountryId(entity.getSupCountryId());
        dto.setSupSiteStateId(entity.getSupSiteStateId());
        return dto;
    }
}