package com.sams.service.impl;

import com.sams.dto.BudgetItemDTO;
import com.sams.entity.BudgetItem;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BudgetItemRepository;
import com.sams.service.BudgetItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetItemServiceImpl implements BudgetItemService {

    private final BudgetItemRepository repository;

    @Override
    @Transactional
    public BudgetItemDTO create(BudgetItemDTO dto) {
        BudgetItem entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BudgetItemDTO getById(Long id) {
        BudgetItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetItem not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BudgetItemDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BudgetItemDTO update(Long id, BudgetItemDTO dto) {
        BudgetItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetItem not found with ID: " + id));
        BudgetItem mapped = mapToEntity(dto);
        mapped.setBudgetItemId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BudgetItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetItem not found with ID: " + id));
        repository.delete(entity);
    }

    private BudgetItem mapToEntity(BudgetItemDTO dto) {
        BudgetItem entity = new BudgetItem();
        entity.setBudgetItemId(dto.getBudgetItemId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setBudgetItemDescription(dto.getBudgetItemDescription());
        entity.setBudgetItemExpenseType(dto.getBudgetItemExpenseType());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BudgetItemDTO mapToDTO(BudgetItem entity) {
        BudgetItemDTO dto = new BudgetItemDTO();
        dto.setBudgetItemId(entity.getBudgetItemId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setBudgetItemDescription(entity.getBudgetItemDescription());
        dto.setBudgetItemExpenseType(entity.getBudgetItemExpenseType());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}