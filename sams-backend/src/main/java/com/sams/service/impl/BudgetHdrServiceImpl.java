package com.sams.service.impl;

import com.sams.dto.BudgetHdrDTO;
import com.sams.entity.BudgetHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BudgetHdrRepository;
import com.sams.service.BudgetHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetHdrServiceImpl implements BudgetHdrService {

    private final BudgetHdrRepository repository;

    @Override
    @Transactional
    public BudgetHdrDTO create(BudgetHdrDTO dto) {
        BudgetHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BudgetHdrDTO getById(Long id) {
        BudgetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BudgetHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BudgetHdrDTO update(Long id, BudgetHdrDTO dto) {
        BudgetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetHdr not found with ID: " + id));
        BudgetHdr mapped = mapToEntity(dto);
        mapped.setBudgetHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BudgetHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BudgetHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private BudgetHdr mapToEntity(BudgetHdrDTO dto) {
        BudgetHdr entity = new BudgetHdr();
        entity.setBudgetHdrId(dto.getBudgetHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setBudgetName(dto.getBudgetName());
        entity.setBudgetStatus(dto.getBudgetStatus());
        entity.setFyStartMonth(dto.getFyStartMonth());
        entity.setFyEndMonth(dto.getFyEndMonth());
        entity.setCurCd(dto.getCurCd());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BudgetHdrDTO mapToDTO(BudgetHdr entity) {
        BudgetHdrDTO dto = new BudgetHdrDTO();
        dto.setBudgetHdrId(entity.getBudgetHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setBudgetName(entity.getBudgetName());
        dto.setBudgetStatus(entity.getBudgetStatus());
        dto.setFyStartMonth(entity.getFyStartMonth());
        dto.setFyEndMonth(entity.getFyEndMonth());
        dto.setCurCd(entity.getCurCd());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}