package com.sams.service.impl;

import com.sams.dto.MaintScheduleTypeDTO;
import com.sams.entity.MaintScheduleType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MaintScheduleTypeRepository;
import com.sams.service.MaintScheduleTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintScheduleTypeServiceImpl implements MaintScheduleTypeService {

    private final MaintScheduleTypeRepository repository;

    @Override
    @Transactional
    public MaintScheduleTypeDTO create(MaintScheduleTypeDTO dto) {
        MaintScheduleType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MaintScheduleTypeDTO getById(Long id) {
        MaintScheduleType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MaintScheduleTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintScheduleTypeDTO update(Long id, MaintScheduleTypeDTO dto) {
        MaintScheduleType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleType not found with ID: " + id));
        MaintScheduleType mapped = mapToEntity(dto);
        mapped.setMaintScheduleTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MaintScheduleType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleType not found with ID: " + id));
        repository.delete(entity);
    }

    private MaintScheduleType mapToEntity(MaintScheduleTypeDTO dto) {
        MaintScheduleType entity = new MaintScheduleType();
        entity.setMaintScheduleTypeId(dto.getMaintScheduleTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setMaintScheduleTypeName(dto.getMaintScheduleTypeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private MaintScheduleTypeDTO mapToDTO(MaintScheduleType entity) {
        MaintScheduleTypeDTO dto = new MaintScheduleTypeDTO();
        dto.setMaintScheduleTypeId(entity.getMaintScheduleTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setMaintScheduleTypeName(entity.getMaintScheduleTypeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}