package com.sams.service.impl;

import com.sams.dto.PurchaseProcessDTO;
import com.sams.entity.PurchaseProcess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchaseProcessRepository;
import com.sams.service.PurchaseProcessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseProcessServiceImpl implements PurchaseProcessService {

    private final PurchaseProcessRepository repository;

    @Override
    @Transactional
    public PurchaseProcessDTO create(PurchaseProcessDTO dto) {
        PurchaseProcess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchaseProcessDTO getById(Long id) {
        PurchaseProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseProcess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchaseProcessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseProcessDTO update(Long id, PurchaseProcessDTO dto) {
        PurchaseProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseProcess not found with ID: " + id));
        PurchaseProcess mapped = mapToEntity(dto);
        mapped.setPurchaseProcessId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchaseProcess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseProcess not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchaseProcess mapToEntity(PurchaseProcessDTO dto) {
        PurchaseProcess entity = new PurchaseProcess();
        entity.setPurchaseProcessId(dto.getPurchaseProcessId());
        entity.setOrgId(dto.getOrgId());
        entity.setPurchaseProcessName(dto.getPurchaseProcessName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private PurchaseProcessDTO mapToDTO(PurchaseProcess entity) {
        PurchaseProcessDTO dto = new PurchaseProcessDTO();
        dto.setPurchaseProcessId(entity.getPurchaseProcessId());
        dto.setOrgId(entity.getOrgId());
        dto.setPurchaseProcessName(entity.getPurchaseProcessName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}