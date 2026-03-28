package com.sams.service.impl;

import com.sams.dto.BuildingBlockDTO;
import com.sams.entity.BuildingBlock;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BuildingBlockRepository;
import com.sams.service.BuildingBlockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingBlockServiceImpl implements BuildingBlockService {

    private final BuildingBlockRepository repository;

    @Override
    @Transactional
    public BuildingBlockDTO create(BuildingBlockDTO dto) {
        BuildingBlock entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BuildingBlockDTO getById(Long id) {
        BuildingBlock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingBlock not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BuildingBlockDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BuildingBlockDTO update(Long id, BuildingBlockDTO dto) {
        BuildingBlock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingBlock not found with ID: " + id));
        BuildingBlock mapped = mapToEntity(dto);
        mapped.setBuildingBlockId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BuildingBlock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingBlock not found with ID: " + id));
        repository.delete(entity);
    }

    private BuildingBlock mapToEntity(BuildingBlockDTO dto) {
        BuildingBlock entity = new BuildingBlock();
        entity.setBuildingBlockId(dto.getBuildingBlockId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setBlockName(dto.getBlockName());
        entity.setBlockDesc(dto.getBlockDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BuildingBlockDTO mapToDTO(BuildingBlock entity) {
        BuildingBlockDTO dto = new BuildingBlockDTO();
        dto.setBuildingBlockId(entity.getBuildingBlockId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setBlockName(entity.getBlockName());
        dto.setBlockDesc(entity.getBlockDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}