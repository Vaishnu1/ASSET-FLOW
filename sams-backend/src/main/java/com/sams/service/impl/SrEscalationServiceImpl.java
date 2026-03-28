package com.sams.service.impl;

import com.sams.dto.SrEscalationDTO;
import com.sams.entity.SrEscalation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrEscalationRepository;
import com.sams.service.SrEscalationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrEscalationServiceImpl implements SrEscalationService {

    private final SrEscalationRepository repository;

    @Override
    @Transactional
    public SrEscalationDTO create(SrEscalationDTO dto) {
        SrEscalation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrEscalationDTO getById(Long id) {
        SrEscalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrEscalation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrEscalationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrEscalationDTO update(Long id, SrEscalationDTO dto) {
        SrEscalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrEscalation not found with ID: " + id));
        SrEscalation mapped = mapToEntity(dto);
        mapped.setEscalationSrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrEscalation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrEscalation not found with ID: " + id));
        repository.delete(entity);
    }

    private SrEscalation mapToEntity(SrEscalationDTO dto) {
        SrEscalation entity = new SrEscalation();
        entity.setEscalationSrId(dto.getEscalationSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSrType(dto.getSrType());
        entity.setFromStatusId(dto.getFromStatusId());
        entity.setToStatusId(dto.getToStatusId());
        entity.setAllowedMinutes(dto.getAllowedMinutes());
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

    private SrEscalationDTO mapToDTO(SrEscalation entity) {
        SrEscalationDTO dto = new SrEscalationDTO();
        dto.setEscalationSrId(entity.getEscalationSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSrType(entity.getSrType());
        dto.setFromStatusId(entity.getFromStatusId());
        dto.setToStatusId(entity.getToStatusId());
        dto.setAllowedMinutes(entity.getAllowedMinutes());
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