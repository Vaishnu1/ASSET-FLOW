package com.sams.service.impl;

import com.sams.dto.EscalationDTO;
import com.sams.entity.Escalation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EscalationRepository;
import com.sams.service.EscalationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EscalationServiceImpl implements EscalationService {

    private final EscalationRepository repository;

    @Override
    @Transactional
    public EscalationDTO create(EscalationDTO dto) {
        Escalation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EscalationDTO getById(Long id) {
        Escalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Escalation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EscalationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EscalationDTO update(Long id, EscalationDTO dto) {
        Escalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Escalation not found with ID: " + id));
        Escalation mapped = mapToEntity(dto);
        mapped.setEscalationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Escalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Escalation not found with ID: " + id));
        repository.delete(entity);
    }

    private Escalation mapToEntity(EscalationDTO dto) {
        Escalation entity = new Escalation();
        entity.setEscalationId(dto.getEscalationId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setEscalationType(dto.getEscalationType());
        entity.setToEmailIds(dto.getToEmailIds());
        entity.setCcEmailIds(dto.getCcEmailIds());
        entity.setBccEmailIds(dto.getBccEmailIds());
        entity.setNotificationTypes(dto.getNotificationTypes());
        entity.setActive(dto.getActive());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EscalationDTO mapToDTO(Escalation entity) {
        EscalationDTO dto = new EscalationDTO();
        dto.setEscalationId(entity.getEscalationId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setEscalationType(entity.getEscalationType());
        dto.setToEmailIds(entity.getToEmailIds());
        dto.setCcEmailIds(entity.getCcEmailIds());
        dto.setBccEmailIds(entity.getBccEmailIds());
        dto.setNotificationTypes(entity.getNotificationTypes());
        dto.setActive(entity.getActive());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}