package com.sams.service.impl;

import com.sams.dto.BudgetCapexDtlDTO;
import com.sams.entity.BudgetCapexDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BudgetCapexDtlRepository;
import com.sams.service.BudgetCapexDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetCapexDtlServiceImpl implements BudgetCapexDtlService {

    private final BudgetCapexDtlRepository repository;

    @Override
    @Transactional
    public BudgetCapexDtlDTO create(BudgetCapexDtlDTO dto) {
        BudgetCapexDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BudgetCapexDtlDTO getById(Long id) {
        BudgetCapexDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetCapexDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BudgetCapexDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BudgetCapexDtlDTO update(Long id, BudgetCapexDtlDTO dto) {
        BudgetCapexDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetCapexDtl not found with ID: " + id));
        BudgetCapexDtl mapped = mapToEntity(dto);
        mapped.setBudgetCapexDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BudgetCapexDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetCapexDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private BudgetCapexDtl mapToEntity(BudgetCapexDtlDTO dto) {
        BudgetCapexDtl entity = new BudgetCapexDtl();
        entity.setBudgetCapexDtlId(dto.getBudgetCapexDtlId());
        entity.setBudgetDtlId(dto.getBudgetDtlId());
        entity.setModelName(dto.getModelName());
        entity.setRemarks(dto.getRemarks());
        entity.setQty(dto.getQty());
        entity.setProcrumentType(dto.getProcrumentType());
        entity.setProcrumentReason(dto.getProcrumentReason());
        entity.setCurCd(dto.getCurCd());
        entity.setActualSpentAmount(dto.getActualSpentAmount());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setBudgetAmount(dto.getBudgetAmount());
        entity.setManufacturer(dto.getManufacturer());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BudgetCapexDtlDTO mapToDTO(BudgetCapexDtl entity) {
        BudgetCapexDtlDTO dto = new BudgetCapexDtlDTO();
        dto.setBudgetCapexDtlId(entity.getBudgetCapexDtlId());
        dto.setBudgetDtlId(entity.getBudgetDtlId());
        dto.setModelName(entity.getModelName());
        dto.setRemarks(entity.getRemarks());
        dto.setQty(entity.getQty());
        dto.setProcrumentType(entity.getProcrumentType());
        dto.setProcrumentReason(entity.getProcrumentReason());
        dto.setCurCd(entity.getCurCd());
        dto.setActualSpentAmount(entity.getActualSpentAmount());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setBudgetAmount(entity.getBudgetAmount());
        dto.setManufacturer(entity.getManufacturer());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}