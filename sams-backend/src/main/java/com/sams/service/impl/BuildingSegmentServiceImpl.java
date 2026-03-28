package com.sams.service.impl;

import com.sams.dto.BuildingSegmentDTO;
import com.sams.entity.BuildingSegment;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BuildingSegmentRepository;
import com.sams.service.BuildingSegmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingSegmentServiceImpl implements BuildingSegmentService {

    private final BuildingSegmentRepository repository;

    @Override
    @Transactional
    public BuildingSegmentDTO create(BuildingSegmentDTO dto) {
        BuildingSegment entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BuildingSegmentDTO getById(Long id) {
        BuildingSegment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingSegment not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BuildingSegmentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BuildingSegmentDTO update(Long id, BuildingSegmentDTO dto) {
        BuildingSegment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingSegment not found with ID: " + id));
        BuildingSegment mapped = mapToEntity(dto);
        mapped.setBuildingSegmentId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BuildingSegment entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingSegment not found with ID: " + id));
        repository.delete(entity);
    }

    private BuildingSegment mapToEntity(BuildingSegmentDTO dto) {
        BuildingSegment entity = new BuildingSegment();
        entity.setBuildingSegmentId(dto.getBuildingSegmentId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSegmentName(dto.getSegmentName());
        entity.setSegmentDesc(dto.getSegmentDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BuildingSegmentDTO mapToDTO(BuildingSegment entity) {
        BuildingSegmentDTO dto = new BuildingSegmentDTO();
        dto.setBuildingSegmentId(entity.getBuildingSegmentId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSegmentName(entity.getSegmentName());
        dto.setSegmentDesc(entity.getSegmentDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}