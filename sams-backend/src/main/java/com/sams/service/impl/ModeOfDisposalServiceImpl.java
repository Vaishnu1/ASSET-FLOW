package com.sams.service.impl;

import com.sams.dto.ModeOfDisposalDTO;
import com.sams.entity.ModeOfDisposal;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ModeOfDisposalRepository;
import com.sams.service.ModeOfDisposalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ModeOfDisposalServiceImpl implements ModeOfDisposalService {

    private final ModeOfDisposalRepository repository;

    @Override
    @Transactional
    public ModeOfDisposalDTO create(ModeOfDisposalDTO dto) {
        ModeOfDisposal entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ModeOfDisposalDTO getById(Long id) {
        ModeOfDisposal entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModeOfDisposal not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ModeOfDisposalDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ModeOfDisposalDTO update(Long id, ModeOfDisposalDTO dto) {
        ModeOfDisposal entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModeOfDisposal not found with ID: " + id));
        ModeOfDisposal mapped = mapToEntity(dto);
        mapped.setModeOfDisposalId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ModeOfDisposal entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ModeOfDisposal not found with ID: " + id));
        repository.delete(entity);
    }

    private ModeOfDisposal mapToEntity(ModeOfDisposalDTO dto) {
        ModeOfDisposal entity = new ModeOfDisposal();
        entity.setModeOfDisposalId(dto.getModeOfDisposalId());
        entity.setOrgId(dto.getOrgId());
        entity.setModeOfDisposalName(dto.getModeOfDisposalName());
        entity.setIsGatepassNeeded(dto.getIsGatepassNeeded());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ModeOfDisposalDTO mapToDTO(ModeOfDisposal entity) {
        ModeOfDisposalDTO dto = new ModeOfDisposalDTO();
        dto.setModeOfDisposalId(entity.getModeOfDisposalId());
        dto.setOrgId(entity.getOrgId());
        dto.setModeOfDisposalName(entity.getModeOfDisposalName());
        dto.setIsGatepassNeeded(entity.getIsGatepassNeeded());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}