package com.sams.service.impl;

import com.sams.dto.LocatorWarehouseDTO;
import com.sams.entity.LocatorWarehouse;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocatorWarehouseRepository;
import com.sams.service.LocatorWarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocatorWarehouseServiceImpl implements LocatorWarehouseService {

    private final LocatorWarehouseRepository repository;

    @Override
    @Transactional
    public LocatorWarehouseDTO createLocatorWarehouse(LocatorWarehouseDTO dto) {
        LocatorWarehouse entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocatorWarehouseDTO getLocatorWarehouseById(Long id) {
        LocatorWarehouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocatorWarehouse not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocatorWarehouseDTO> getAllLocatorWarehouses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocatorWarehouseDTO updateLocatorWarehouse(Long id, LocatorWarehouseDTO dto) {
        LocatorWarehouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocatorWarehouse not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        LocatorWarehouse mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteLocatorWarehouse(Long id) {
        LocatorWarehouse entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocatorWarehouse not found with ID: " + id));
        repository.delete(entity);
    }

    private LocatorWarehouse mapToEntity(LocatorWarehouseDTO dto) {
        LocatorWarehouse entity = new LocatorWarehouse();
        entity.setLocatorName(dto.getLocatorName());
        entity.setLocatorId(dto.getLocatorId());
        entity.setDimension(dto.getDimension());
        entity.setActive(dto.getActive());
        entity.setWarehouseId(dto.getWarehouseId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        return entity;
    }

    private LocatorWarehouseDTO mapToDTO(LocatorWarehouse entity) {
        LocatorWarehouseDTO dto = new LocatorWarehouseDTO();
        dto.setId(entity.getId());
        dto.setLocatorName(entity.getLocatorName());
        dto.setLocatorId(entity.getLocatorId());
        dto.setDimension(entity.getDimension());
        dto.setActive(entity.getActive());
        dto.setWarehouseId(entity.getWarehouseId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        return dto;
    }
}