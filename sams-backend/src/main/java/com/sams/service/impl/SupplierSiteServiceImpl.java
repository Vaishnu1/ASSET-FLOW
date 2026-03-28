package com.sams.service.impl;

import com.sams.dto.SupplierSiteDTO;
import com.sams.entity.SupplierSite;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierSiteRepository;
import com.sams.service.SupplierSiteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierSiteServiceImpl implements SupplierSiteService {

    private final SupplierSiteRepository repository;

    @Override
    @Transactional
    public SupplierSiteDTO create(SupplierSiteDTO dto) {
        SupplierSite entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierSiteDTO getById(Long id) {
        SupplierSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSite not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierSiteDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierSiteDTO update(Long id, SupplierSiteDTO dto) {
        SupplierSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSite not found with ID: " + id));
        SupplierSite mapped = mapToEntity(dto);
        mapped.setSupplierSiteId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierSite entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSite not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierSite mapToEntity(SupplierSiteDTO dto) {
        SupplierSite entity = new SupplierSite();
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        entity.setSupplierId(dto.getSupplierId());
        entity.setSupplierSiteName(dto.getSupplierSiteName());
        entity.setContactPersonName(dto.getContactPersonName());
        entity.setContactPersonPhoneNo(dto.getContactPersonPhoneNo());
        entity.setContactPersonEmailId(dto.getContactPersonEmailId());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setArea(dto.getArea());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPinCode(dto.getPinCode());
        entity.setCompanyMobileNumber(dto.getCompanyMobileNumber());
        entity.setCompanyLandLineNumber(dto.getCompanyLandLineNumber());
        entity.setCompanyEmailId(dto.getCompanyEmailId());
        entity.setCurCd(dto.getCurCd());
        entity.setPaymentTerms(dto.getPaymentTerms());
        entity.setPaymentMethod(dto.getPaymentMethod());
        entity.setWebsite(dto.getWebsite());
        entity.setServiceCenter(dto.getServiceCenter());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierSiteDTO mapToDTO(SupplierSite entity) {
        SupplierSiteDTO dto = new SupplierSiteDTO();
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        dto.setSupplierId(entity.getSupplierId());
        dto.setSupplierSiteName(entity.getSupplierSiteName());
        dto.setContactPersonName(entity.getContactPersonName());
        dto.setContactPersonPhoneNo(entity.getContactPersonPhoneNo());
        dto.setContactPersonEmailId(entity.getContactPersonEmailId());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setArea(entity.getArea());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPinCode(entity.getPinCode());
        dto.setCompanyMobileNumber(entity.getCompanyMobileNumber());
        dto.setCompanyLandLineNumber(entity.getCompanyLandLineNumber());
        dto.setCompanyEmailId(entity.getCompanyEmailId());
        dto.setCurCd(entity.getCurCd());
        dto.setPaymentTerms(entity.getPaymentTerms());
        dto.setPaymentMethod(entity.getPaymentMethod());
        dto.setWebsite(entity.getWebsite());
        dto.setServiceCenter(entity.getServiceCenter());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}