package com.sams.service.impl;

import com.sams.dto.ContractWarrantyDTO;
import com.sams.entity.ContractWarranty;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractWarrantyRepository;
import com.sams.service.ContractWarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractWarrantyServiceImpl implements ContractWarrantyService {

    private final ContractWarrantyRepository repository;

    @Override
    @Transactional
    public ContractWarrantyDTO create(ContractWarrantyDTO dto) {
        ContractWarranty entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractWarrantyDTO getById(Long id) {
        ContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractWarranty not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractWarrantyDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractWarrantyDTO update(Long id, ContractWarrantyDTO dto) {
        ContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractWarranty not found with ID: " + id));
        ContractWarranty mapped = mapToEntity(dto);
        mapped.setContractWarrantyId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractWarranty not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractWarranty mapToEntity(ContractWarrantyDTO dto) {
        ContractWarranty entity = new ContractWarranty();
        entity.setContractWarrantyId(dto.getContractWarrantyId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setActiveContracts(dto.getActiveContracts());
        entity.setExpiredContracts(dto.getExpiredContracts());
        entity.setTotalContractValue(dto.getTotalContractValue());
        entity.setActiveWarranties(dto.getActiveWarranties());
        entity.setExpiredWarranties(dto.getExpiredWarranties());
        entity.setCoveredWarranties(dto.getCoveredWarranties());
        entity.setUncoveredWarranties(dto.getUncoveredWarranties());
        entity.setSummaryMonth(dto.getSummaryMonth());
        entity.setWarrantyCoverageJson(dto.getWarrantyCoverageJson());
        entity.setTypeDistributionJson(dto.getTypeDistributionJson());
        entity.setExpiryTimelineJson(dto.getExpiryTimelineJson());
        entity.setTopVendorsJson(dto.getTopVendorsJson());
        entity.setValueByTypeJson(dto.getValueByTypeJson());
        entity.setActiveContractsAssetCount(dto.getActiveContractsAssetCount());
        entity.setInsurance(dto.getInsurance());
        entity.setExtendedWarranty(dto.getExtendedWarranty());
        entity.setExpiredTimelineJson(dto.getExpiredTimelineJson());
        return entity;
    }

    private ContractWarrantyDTO mapToDTO(ContractWarranty entity) {
        ContractWarrantyDTO dto = new ContractWarrantyDTO();
        dto.setContractWarrantyId(entity.getContractWarrantyId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setActiveContracts(entity.getActiveContracts());
        dto.setExpiredContracts(entity.getExpiredContracts());
        dto.setTotalContractValue(entity.getTotalContractValue());
        dto.setActiveWarranties(entity.getActiveWarranties());
        dto.setExpiredWarranties(entity.getExpiredWarranties());
        dto.setCoveredWarranties(entity.getCoveredWarranties());
        dto.setUncoveredWarranties(entity.getUncoveredWarranties());
        dto.setSummaryMonth(entity.getSummaryMonth());
        dto.setWarrantyCoverageJson(entity.getWarrantyCoverageJson());
        dto.setTypeDistributionJson(entity.getTypeDistributionJson());
        dto.setExpiryTimelineJson(entity.getExpiryTimelineJson());
        dto.setTopVendorsJson(entity.getTopVendorsJson());
        dto.setValueByTypeJson(entity.getValueByTypeJson());
        dto.setActiveContractsAssetCount(entity.getActiveContractsAssetCount());
        dto.setInsurance(entity.getInsurance());
        dto.setExtendedWarranty(entity.getExtendedWarranty());
        dto.setExpiredTimelineJson(entity.getExpiredTimelineJson());
        return dto;
    }
}