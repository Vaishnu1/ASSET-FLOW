package com.sams.service.impl;

import com.sams.dto.BudgetDtlDTO;
import com.sams.entity.BudgetDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BudgetDtlRepository;
import com.sams.service.BudgetDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetDtlServiceImpl implements BudgetDtlService {

    private final BudgetDtlRepository repository;

    @Override
    @Transactional
    public BudgetDtlDTO create(BudgetDtlDTO dto) {
        BudgetDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BudgetDtlDTO getById(Long id) {
        BudgetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BudgetDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BudgetDtlDTO update(Long id, BudgetDtlDTO dto) {
        BudgetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetDtl not found with ID: " + id));
        BudgetDtl mapped = mapToEntity(dto);
        mapped.setBudgetDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BudgetDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private BudgetDtl mapToEntity(BudgetDtlDTO dto) {
        BudgetDtl entity = new BudgetDtl();
        entity.setBudgetDtlId(dto.getBudgetDtlId());
        entity.setBudgetHdrId(dto.getBudgetHdrId());
        entity.setBudgetItem(dto.getBudgetItem());
        entity.setBudgetAmount(dto.getBudgetAmount());
        entity.setActualSpentAmount(dto.getActualSpentAmount());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BudgetDtlDTO mapToDTO(BudgetDtl entity) {
        BudgetDtlDTO dto = new BudgetDtlDTO();
        dto.setBudgetDtlId(entity.getBudgetDtlId());
        dto.setBudgetHdrId(entity.getBudgetHdrId());
        dto.setBudgetItem(entity.getBudgetItem());
        dto.setBudgetAmount(entity.getBudgetAmount());
        dto.setActualSpentAmount(entity.getActualSpentAmount());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}