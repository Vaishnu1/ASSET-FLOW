package com.sams.service.impl;

import com.sams.dto.MaintScheduleDtlDTO;
import com.sams.entity.MaintScheduleDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MaintScheduleDtlRepository;
import com.sams.service.MaintScheduleDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintScheduleDtlServiceImpl implements MaintScheduleDtlService {

    private final MaintScheduleDtlRepository repository;

    @Override
    @Transactional
    public MaintScheduleDtlDTO create(MaintScheduleDtlDTO dto) {
        MaintScheduleDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MaintScheduleDtlDTO getById(Long id) {
        MaintScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MaintScheduleDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintScheduleDtlDTO update(Long id, MaintScheduleDtlDTO dto) {
        MaintScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleDtl not found with ID: " + id));
        MaintScheduleDtl mapped = mapToEntity(dto);
        mapped.setScheduleDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MaintScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private MaintScheduleDtl mapToEntity(MaintScheduleDtlDTO dto) {
        MaintScheduleDtl entity = new MaintScheduleDtl();
        entity.setScheduleDtlId(dto.getScheduleDtlId());
        entity.setScheduleHdrId(dto.getScheduleHdrId());
        entity.setAssetHdrId(dto.getAssetHdrId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setOccurrenceNo(dto.getOccurrenceNo());
        entity.setScheduleDate(dto.getScheduleDate());
        entity.setScheduleStatus(dto.getScheduleStatus());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setSrStatus(dto.getSrStatus());
        entity.setSrAssignedTo(dto.getSrAssignedTo());
        entity.setSrClosedDate(dto.getSrClosedDate());
        entity.setCancelledBy(dto.getCancelledBy());
        entity.setCancelledReason(dto.getCancelledReason());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setActive(dto.getActive());
        return entity;
    }

    private MaintScheduleDtlDTO mapToDTO(MaintScheduleDtl entity) {
        MaintScheduleDtlDTO dto = new MaintScheduleDtlDTO();
        dto.setScheduleDtlId(entity.getScheduleDtlId());
        dto.setScheduleHdrId(entity.getScheduleHdrId());
        dto.setAssetHdrId(entity.getAssetHdrId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setOccurrenceNo(entity.getOccurrenceNo());
        dto.setScheduleDate(entity.getScheduleDate());
        dto.setScheduleStatus(entity.getScheduleStatus());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setSrStatus(entity.getSrStatus());
        dto.setSrAssignedTo(entity.getSrAssignedTo());
        dto.setSrClosedDate(entity.getSrClosedDate());
        dto.setCancelledBy(entity.getCancelledBy());
        dto.setCancelledReason(entity.getCancelledReason());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setActive(entity.getActive());
        return dto;
    }
}