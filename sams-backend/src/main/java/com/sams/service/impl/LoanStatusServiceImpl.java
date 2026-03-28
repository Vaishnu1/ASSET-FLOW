package com.sams.service.impl;

import com.sams.dto.LoanStatusDTO;
import com.sams.entity.LoanStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LoanStatusRepository;
import com.sams.service.LoanStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanStatusServiceImpl implements LoanStatusService {

    private final LoanStatusRepository repository;

    @Override
    @Transactional
    public LoanStatusDTO create(LoanStatusDTO dto) {
        LoanStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LoanStatusDTO getById(Long id) {
        LoanStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LoanStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LoanStatusDTO update(Long id, LoanStatusDTO dto) {
        LoanStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanStatus not found with ID: " + id));
        LoanStatus mapped = mapToEntity(dto);
        mapped.setLoanStatusId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LoanStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private LoanStatus mapToEntity(LoanStatusDTO dto) {
        LoanStatus entity = new LoanStatus();
        entity.setLoanStatusId(dto.getLoanStatusId());
        entity.setLoanStatusName(dto.getLoanStatusName());
        entity.setLoanStatusDesc(dto.getLoanStatusDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LoanStatusDTO mapToDTO(LoanStatus entity) {
        LoanStatusDTO dto = new LoanStatusDTO();
        dto.setLoanStatusId(entity.getLoanStatusId());
        dto.setLoanStatusName(entity.getLoanStatusName());
        dto.setLoanStatusDesc(entity.getLoanStatusDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}