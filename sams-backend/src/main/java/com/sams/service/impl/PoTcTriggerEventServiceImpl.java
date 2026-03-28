package com.sams.service.impl;

import com.sams.dto.PoTcTriggerEventDTO;
import com.sams.entity.PoTcTriggerEvent;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoTcTriggerEventRepository;
import com.sams.service.PoTcTriggerEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoTcTriggerEventServiceImpl implements PoTcTriggerEventService {

    private final PoTcTriggerEventRepository repository;

    @Override
    @Transactional
    public PoTcTriggerEventDTO create(PoTcTriggerEventDTO dto) {
        PoTcTriggerEvent entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoTcTriggerEventDTO getById(Long id) {
        PoTcTriggerEvent entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcTriggerEvent not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoTcTriggerEventDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoTcTriggerEventDTO update(Long id, PoTcTriggerEventDTO dto) {
        PoTcTriggerEvent entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcTriggerEvent not found with ID: " + id));
        PoTcTriggerEvent mapped = mapToEntity(dto);
        mapped.setPoTcTriggerEventId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoTcTriggerEvent entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoTcTriggerEvent not found with ID: " + id));
        repository.delete(entity);
    }

    private PoTcTriggerEvent mapToEntity(PoTcTriggerEventDTO dto) {
        PoTcTriggerEvent entity = new PoTcTriggerEvent();
        entity.setPoTcTriggerEventId(dto.getPoTcTriggerEventId());
        entity.setOrgId(dto.getOrgId());
        entity.setTriggentEventName(dto.getTriggentEventName());
        entity.setTriggentEventType(dto.getTriggentEventType());
        entity.setTriggentEventAt(dto.getTriggentEventAt());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private PoTcTriggerEventDTO mapToDTO(PoTcTriggerEvent entity) {
        PoTcTriggerEventDTO dto = new PoTcTriggerEventDTO();
        dto.setPoTcTriggerEventId(entity.getPoTcTriggerEventId());
        dto.setOrgId(entity.getOrgId());
        dto.setTriggentEventName(entity.getTriggentEventName());
        dto.setTriggentEventType(entity.getTriggentEventType());
        dto.setTriggentEventAt(entity.getTriggentEventAt());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}