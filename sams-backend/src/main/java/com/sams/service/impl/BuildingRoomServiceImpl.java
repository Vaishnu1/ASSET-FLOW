package com.sams.service.impl;

import com.sams.dto.BuildingRoomDTO;
import com.sams.entity.BuildingRoom;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.BuildingRoomRepository;
import com.sams.service.BuildingRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BuildingRoomServiceImpl implements BuildingRoomService {

    private final BuildingRoomRepository repository;

    @Override
    @Transactional
    public BuildingRoomDTO create(BuildingRoomDTO dto) {
        BuildingRoom entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public BuildingRoomDTO getById(Long id) {
        BuildingRoom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingRoom not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<BuildingRoomDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BuildingRoomDTO update(Long id, BuildingRoomDTO dto) {
        BuildingRoom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingRoom not found with ID: " + id));
        BuildingRoom mapped = mapToEntity(dto);
        mapped.setBuildingRoomId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        BuildingRoom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("BuildingRoom not found with ID: " + id));
        repository.delete(entity);
    }

    private BuildingRoom mapToEntity(BuildingRoomDTO dto) {
        BuildingRoom entity = new BuildingRoom();
        entity.setBuildingRoomId(dto.getBuildingRoomId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setRoomName(dto.getRoomName());
        entity.setRoomDesc(dto.getRoomDesc());
        entity.setBlockId(dto.getBlockId());
        entity.setFloorId(dto.getFloorId());
        entity.setSegmentId(dto.getSegmentId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private BuildingRoomDTO mapToDTO(BuildingRoom entity) {
        BuildingRoomDTO dto = new BuildingRoomDTO();
        dto.setBuildingRoomId(entity.getBuildingRoomId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setRoomName(entity.getRoomName());
        dto.setRoomDesc(entity.getRoomDesc());
        dto.setBlockId(entity.getBlockId());
        dto.setFloorId(entity.getFloorId());
        dto.setSegmentId(entity.getSegmentId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}