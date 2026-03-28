package com.sams.service.impl;

import com.sams.dto.WareHouseDTO;
import com.sams.entity.WareHouse;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WareHouseRepository;
import com.sams.service.WareHouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WareHouseServiceImpl implements WareHouseService {

    private final WareHouseRepository repository;

    @Override
    @Transactional
    public WareHouseDTO createWareHouse(WareHouseDTO dto) {
        WareHouse entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WareHouseDTO getWareHouseById(Long id) {
        WareHouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WareHouse not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WareHouseDTO> getAllWareHouses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WareHouseDTO updateWareHouse(Long id, WareHouseDTO dto) {
        WareHouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WareHouse not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        WareHouse mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteWareHouse(Long id) {
        WareHouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WareHouse not found with ID: " + id));
        repository.delete(entity);
    }

    private WareHouse mapToEntity(WareHouseDTO dto) {
        WareHouse entity = new WareHouse();
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setWareHouseId(dto.getWareHouseId());
        entity.setWareHouseCode(dto.getWareHouseCode());
        entity.setDescription(dto.getDescription());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        return entity;
    }

    private WareHouseDTO mapToDTO(WareHouse entity) {
        WareHouseDTO dto = new WareHouseDTO();
        dto.setId(entity.getId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setWareHouseId(entity.getWareHouseId());
        dto.setWareHouseCode(entity.getWareHouseCode());
        dto.setDescription(entity.getDescription());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        return dto;
    }
}