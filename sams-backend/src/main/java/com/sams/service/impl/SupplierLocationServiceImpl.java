package com.sams.service.impl;

import com.sams.dto.SupplierLocationDTO;
import com.sams.entity.SupplierLocation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierLocationRepository;
import com.sams.service.SupplierLocationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierLocationServiceImpl implements SupplierLocationService {

    private final SupplierLocationRepository repository;

    @Override
    @Transactional
    public SupplierLocationDTO createSupplierLocation(SupplierLocationDTO dto) {
        SupplierLocation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierLocationDTO getSupplierLocationById(Long id) {
        SupplierLocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierLocation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierLocationDTO> getAllSupplierLocations() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierLocationDTO updateSupplierLocation(Long id, SupplierLocationDTO dto) {
        SupplierLocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierLocation not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        SupplierLocation mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteSupplierLocation(Long id) {
        SupplierLocation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierLocation not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierLocation mapToEntity(SupplierLocationDTO dto) {
        SupplierLocation entity = new SupplierLocation();
        entity.setSupplierLocationId(dto.getSupplierLocationId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setContactPerson(dto.getContactPerson());
        entity.setSuppLocAddress1(dto.getSuppLocAddress1());
        entity.setSuppLocAddress2(dto.getSuppLocAddress2());
        entity.setSuppLocArea(dto.getSuppLocArea());
        entity.setSuppLocCity(dto.getSuppLocCity());
        entity.setSuppLocState(dto.getSuppLocState());
        entity.setSuppLocCountry(dto.getSuppLocCountry());
        entity.setSuppLocPinCode(dto.getSuppLocPinCode());
        entity.setCompanyRegistrationNumber(dto.getCompanyRegistrationNumber());
        entity.setTaxRegistrationName1(dto.getTaxRegistrationName1());
        entity.setTaxRegistrationName2(dto.getTaxRegistrationName2());
        entity.setTaxRegistrationName3(dto.getTaxRegistrationName3());
        entity.setMobileNumber(dto.getMobileNumber());
        entity.setLandLineNumber(dto.getLandLineNumber());
        entity.setSuppLocEmail(dto.getSuppLocEmail());
        entity.setSuppLocCurCd(dto.getSuppLocCurCd());
        entity.setPaymentTerms(dto.getPaymentTerms());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setSuppLocAttribute1(dto.getSuppLocAttribute1());
        entity.setSuppLocAttribute2(dto.getSuppLocAttribute2());
        entity.setSuppLocAttribute3(dto.getSuppLocAttribute3());
        entity.setSuppLocAttribute4(dto.getSuppLocAttribute4());
        entity.setSuppLocAttribute5(dto.getSuppLocAttribute5());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setSupplierRegList(dto.getSupplierRegList());
        entity.setSupplierType(dto.getSupplierType());
        entity.setSupplierName(dto.getSupplierName());
        return entity;
    }

    private SupplierLocationDTO mapToDTO(SupplierLocation entity) {
        SupplierLocationDTO dto = new SupplierLocationDTO();
        dto.setId(entity.getId());
        dto.setSupplierLocationId(entity.getSupplierLocationId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setContactPerson(entity.getContactPerson());
        dto.setSuppLocAddress1(entity.getSuppLocAddress1());
        dto.setSuppLocAddress2(entity.getSuppLocAddress2());
        dto.setSuppLocArea(entity.getSuppLocArea());
        dto.setSuppLocCity(entity.getSuppLocCity());
        dto.setSuppLocState(entity.getSuppLocState());
        dto.setSuppLocCountry(entity.getSuppLocCountry());
        dto.setSuppLocPinCode(entity.getSuppLocPinCode());
        dto.setCompanyRegistrationNumber(entity.getCompanyRegistrationNumber());
        dto.setTaxRegistrationName1(entity.getTaxRegistrationName1());
        dto.setTaxRegistrationName2(entity.getTaxRegistrationName2());
        dto.setTaxRegistrationName3(entity.getTaxRegistrationName3());
        dto.setMobileNumber(entity.getMobileNumber());
        dto.setLandLineNumber(entity.getLandLineNumber());
        dto.setSuppLocEmail(entity.getSuppLocEmail());
        dto.setSuppLocCurCd(entity.getSuppLocCurCd());
        dto.setPaymentTerms(entity.getPaymentTerms());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setSuppLocAttribute1(entity.getSuppLocAttribute1());
        dto.setSuppLocAttribute2(entity.getSuppLocAttribute2());
        dto.setSuppLocAttribute3(entity.getSuppLocAttribute3());
        dto.setSuppLocAttribute4(entity.getSuppLocAttribute4());
        dto.setSuppLocAttribute5(entity.getSuppLocAttribute5());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setSupplierRegList(entity.getSupplierRegList());
        dto.setSupplierType(entity.getSupplierType());
        dto.setSupplierName(entity.getSupplierName());
        return dto;
    }
}