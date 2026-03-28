package com.sams.service.impl;

import com.sams.dto.LegalEntityRegDTO;
import com.sams.entity.LegalEntityReg;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LegalEntityRegRepository;
import com.sams.service.LegalEntityRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LegalEntityRegServiceImpl implements LegalEntityRegService {

    private final LegalEntityRegRepository repository;

    @Override
    @Transactional
    public LegalEntityRegDTO create(LegalEntityRegDTO dto) {
        LegalEntityReg entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LegalEntityRegDTO getById(Long id) {
        LegalEntityReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntityReg not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LegalEntityRegDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LegalEntityRegDTO update(Long id, LegalEntityRegDTO dto) {
        LegalEntityReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntityReg not found with ID: " + id));
        LegalEntityReg mapped = mapToEntity(dto);
        mapped.setLegalEntityRegId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LegalEntityReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LegalEntityReg not found with ID: " + id));
        repository.delete(entity);
    }

    private LegalEntityReg mapToEntity(LegalEntityRegDTO dto) {
        LegalEntityReg entity = new LegalEntityReg();
        entity.setLegalEntityRegId(dto.getLegalEntityRegId());
        entity.setRegistrationName(dto.getRegistrationName());
        entity.setRegistrationNo(dto.getRegistrationNo());
        entity.setLegalEntityId(dto.getLegalEntityId());
        entity.setLegalEntityName(dto.getLegalEntityName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LegalEntityRegDTO mapToDTO(LegalEntityReg entity) {
        LegalEntityRegDTO dto = new LegalEntityRegDTO();
        dto.setLegalEntityRegId(entity.getLegalEntityRegId());
        dto.setRegistrationName(entity.getRegistrationName());
        dto.setRegistrationNo(entity.getRegistrationNo());
        dto.setLegalEntityId(entity.getLegalEntityId());
        dto.setLegalEntityName(entity.getLegalEntityName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}