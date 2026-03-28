package com.sams.service.impl;

import com.sams.dto.MaintScheduleHdrDTO;
import com.sams.entity.MaintScheduleHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MaintScheduleHdrRepository;
import com.sams.service.MaintScheduleHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintScheduleHdrServiceImpl implements MaintScheduleHdrService {

    private final MaintScheduleHdrRepository repository;

    @Override
    @Transactional
    public MaintScheduleHdrDTO create(MaintScheduleHdrDTO dto) {
        MaintScheduleHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MaintScheduleHdrDTO getById(Long id) {
        MaintScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MaintScheduleHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintScheduleHdrDTO update(Long id, MaintScheduleHdrDTO dto) {
        MaintScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleHdr not found with ID: " + id));
        MaintScheduleHdr mapped = mapToEntity(dto);
        mapped.setScheduleHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MaintScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private MaintScheduleHdr mapToEntity(MaintScheduleHdrDTO dto) {
        MaintScheduleHdr entity = new MaintScheduleHdr();
        entity.setScheduleHdrId(dto.getScheduleHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setScheduleTitle(dto.getScheduleTitle());
        entity.setScheduleType(dto.getScheduleType());
        entity.setPriority(dto.getPriority());
        entity.setFrequency(dto.getFrequency());
        entity.setScheduleEndType(dto.getScheduleEndType());
        entity.setOccurrences(dto.getOccurrences());
        entity.setSrCreateDaysBefSch(dto.getSrCreateDaysBefSch());
        entity.setStartDate(dto.getStartDate());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private MaintScheduleHdrDTO mapToDTO(MaintScheduleHdr entity) {
        MaintScheduleHdrDTO dto = new MaintScheduleHdrDTO();
        dto.setScheduleHdrId(entity.getScheduleHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setScheduleTitle(entity.getScheduleTitle());
        dto.setScheduleType(entity.getScheduleType());
        dto.setPriority(entity.getPriority());
        dto.setFrequency(entity.getFrequency());
        dto.setScheduleEndType(entity.getScheduleEndType());
        dto.setOccurrences(entity.getOccurrences());
        dto.setSrCreateDaysBefSch(entity.getSrCreateDaysBefSch());
        dto.setStartDate(entity.getStartDate());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}