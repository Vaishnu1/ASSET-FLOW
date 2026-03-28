package com.sams.service.impl;

import com.sams.dto.ManufacturerDTO;
import com.sams.entity.Manufacturer;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ManufacturerRepository;
import com.sams.service.ManufacturerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManufacturerServiceImpl implements ManufacturerService {

    private final ManufacturerRepository repository;

    @Override
    @Transactional
    public ManufacturerDTO createManufacturer(ManufacturerDTO dto) {
        Manufacturer entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ManufacturerDTO getManufacturerById(Long id) {
        Manufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ManufacturerDTO> getAllManufacturers() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ManufacturerDTO updateManufacturer(Long id, ManufacturerDTO dto) {
        Manufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Manufacturer mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteManufacturer(Long id) {
        Manufacturer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Manufacturer not found with ID: " + id));
        repository.delete(entity);
    }

    private Manufacturer mapToEntity(ManufacturerDTO dto) {
        Manufacturer entity = new Manufacturer();
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setOrgId(dto.getOrgId());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setAddress(dto.getAddress());
        entity.setArea(dto.getArea());
        entity.setLocCountry(dto.getLocCountry());
        entity.setLocCountryId(dto.getLocCountryId());
        entity.setLocStateId(dto.getLocStateId());
        entity.setLocState(dto.getLocState());
        entity.setLocCityId(dto.getLocCityId());
        entity.setLocCity(dto.getLocCity());
        entity.setZipCode(dto.getZipCode());
        entity.setEmailId(dto.getEmailId());
        entity.setPhoneNo(dto.getPhoneNo());
        entity.setContactPerson(dto.getContactPerson());
        entity.setContactPhoneNo(dto.getContactPhoneNo());
        entity.setAltPhoneNo(dto.getAltPhoneNo());
        entity.setContactPersonEmailId(dto.getContactPersonEmailId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setManufacturerCode(dto.getManufacturerCode());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierName(dto.getSupplierName());
        return entity;
    }

    private ManufacturerDTO mapToDTO(Manufacturer entity) {
        ManufacturerDTO dto = new ManufacturerDTO();
        dto.setId(entity.getId());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setOrgId(entity.getOrgId());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setAddress(entity.getAddress());
        dto.setArea(entity.getArea());
        dto.setLocCountry(entity.getLocCountry());
        dto.setLocCountryId(entity.getLocCountryId());
        dto.setLocStateId(entity.getLocStateId());
        dto.setLocState(entity.getLocState());
        dto.setLocCityId(entity.getLocCityId());
        dto.setLocCity(entity.getLocCity());
        dto.setZipCode(entity.getZipCode());
        dto.setEmailId(entity.getEmailId());
        dto.setPhoneNo(entity.getPhoneNo());
        dto.setContactPerson(entity.getContactPerson());
        dto.setContactPhoneNo(entity.getContactPhoneNo());
        dto.setAltPhoneNo(entity.getAltPhoneNo());
        dto.setContactPersonEmailId(entity.getContactPersonEmailId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setManufacturerCode(entity.getManufacturerCode());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierName(entity.getSupplierName());
        return dto;
    }
}