package com.sams.service.impl;

import com.sams.dto.ContractDetailAssetDTO;
import com.sams.entity.ContractDetailAsset;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractDetailAssetRepository;
import com.sams.service.ContractDetailAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractDetailAssetServiceImpl implements ContractDetailAssetService {

    private final ContractDetailAssetRepository repository;

    @Override
    @Transactional
    public ContractDetailAssetDTO createContractDetailAsset(ContractDetailAssetDTO dto) {
        ContractDetailAsset entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractDetailAssetDTO getContractDetailAssetById(Long id) {
        ContractDetailAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDetailAsset not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractDetailAssetDTO> getAllContractDetailAssets() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractDetailAssetDTO updateContractDetailAsset(Long id, ContractDetailAssetDTO dto) {
        ContractDetailAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDetailAsset not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        ContractDetailAsset mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteContractDetailAsset(Long id) {
        ContractDetailAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDetailAsset not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractDetailAsset mapToEntity(ContractDetailAssetDTO dto) {
        ContractDetailAsset entity = new ContractDetailAsset();
        entity.setContractAssetId(dto.getContractAssetId());
        entity.setContractHdrId(dto.getContractHdrId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setActive(dto.getActive());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setAssetCode(dto.getAssetCode());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setDescription(dto.getDescription());
        entity.setEquipmentCode(dto.getEquipmentCode());
        entity.setContractAlreadyExistForPeriod(dto.getContractAlreadyExistForPeriod());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setSerialNo(dto.getSerialNo());
        entity.setTotalPurchaseAmt(dto.getTotalPurchaseAmt());
        entity.setSubCategoryName(dto.getSubCategoryName());
        entity.setExcludedServices(dto.getExcludedServices());
        entity.setIncludedServices(dto.getIncludedServices());
        entity.setContractAmnt(dto.getContractAmnt());
        return entity;
    }

    private ContractDetailAssetDTO mapToDTO(ContractDetailAsset entity) {
        ContractDetailAssetDTO dto = new ContractDetailAssetDTO();
        dto.setId(entity.getId());
        dto.setContractAssetId(entity.getContractAssetId());
        dto.setContractHdrId(entity.getContractHdrId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setActive(entity.getActive());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setAssetCode(entity.getAssetCode());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setDescription(entity.getDescription());
        dto.setEquipmentCode(entity.getEquipmentCode());
        dto.setContractAlreadyExistForPeriod(entity.getContractAlreadyExistForPeriod());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setSerialNo(entity.getSerialNo());
        dto.setTotalPurchaseAmt(entity.getTotalPurchaseAmt());
        dto.setSubCategoryName(entity.getSubCategoryName());
        dto.setExcludedServices(entity.getExcludedServices());
        dto.setIncludedServices(entity.getIncludedServices());
        dto.setContractAmnt(entity.getContractAmnt());
        return dto;
    }
}