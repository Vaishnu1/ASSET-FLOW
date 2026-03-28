package com.sams.service.impl;

import com.sams.dto.ContractAssetDTO;
import com.sams.entity.ContractAsset;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractAssetRepository;
import com.sams.service.ContractAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractAssetServiceImpl implements ContractAssetService {

    private final ContractAssetRepository repository;

    @Override
    @Transactional
    public ContractAssetDTO create(ContractAssetDTO dto) {
        ContractAsset entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractAssetDTO getById(Long id) {
        ContractAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractAsset not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractAssetDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractAssetDTO update(Long id, ContractAssetDTO dto) {
        ContractAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractAsset not found with ID: " + id));
        ContractAsset mapped = mapToEntity(dto);
        mapped.setContractAssetId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractAsset entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractAsset not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractAsset mapToEntity(ContractAssetDTO dto) {
        ContractAsset entity = new ContractAsset();
        entity.setContractAssetId(dto.getContractAssetId());
        entity.setContractId(dto.getContractId());
        entity.setAssetId(dto.getAssetId());
        entity.setModelId(dto.getModelId());
        entity.setActive(dto.getActive());
        entity.setIncludedServices(dto.getIncludedServices());
        entity.setExcludedServices(dto.getExcludedServices());
        entity.setContractAmnt(dto.getContractAmnt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ContractAssetDTO mapToDTO(ContractAsset entity) {
        ContractAssetDTO dto = new ContractAssetDTO();
        dto.setContractAssetId(entity.getContractAssetId());
        dto.setContractId(entity.getContractId());
        dto.setAssetId(entity.getAssetId());
        dto.setModelId(entity.getModelId());
        dto.setActive(entity.getActive());
        dto.setIncludedServices(entity.getIncludedServices());
        dto.setExcludedServices(entity.getExcludedServices());
        dto.setContractAmnt(entity.getContractAmnt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}