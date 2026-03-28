package com.sams.service.impl;

import com.sams.dto.BuildingFloorDTO;
import com.sams.entity.BuildingFloor;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BuildingFloorRepository;
import com.sams.service.BuildingFloorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingFloorServiceImpl implements BuildingFloorService {

    private final BuildingFloorRepository repository;

    @Override
    @Transactional
    public BuildingFloorDTO create(BuildingFloorDTO dto) {
        BuildingFloor entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BuildingFloorDTO getById(Long id) {
        BuildingFloor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingFloor not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BuildingFloorDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BuildingFloorDTO update(Long id, BuildingFloorDTO dto) {
        BuildingFloor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingFloor not found with ID: " + id));
        BuildingFloor mapped = mapToEntity(dto);
        mapped.setBuildingFloorId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BuildingFloor entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingFloor not found with ID: " + id));
        repository.delete(entity);
    }

    private BuildingFloor mapToEntity(BuildingFloorDTO dto) {
        BuildingFloor entity = new BuildingFloor();
        entity.setBuildingFloorId(dto.getBuildingFloorId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setFloorName(dto.getFloorName());
        entity.setBlockId(dto.getBlockId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BuildingFloorDTO mapToDTO(BuildingFloor entity) {
        BuildingFloorDTO dto = new BuildingFloorDTO();
        dto.setBuildingFloorId(entity.getBuildingFloorId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setFloorName(entity.getFloorName());
        dto.setBlockId(entity.getBlockId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}