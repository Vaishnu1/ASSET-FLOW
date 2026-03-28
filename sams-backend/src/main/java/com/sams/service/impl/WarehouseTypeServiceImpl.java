package com.sams.service.impl;

import com.sams.dto.WarehouseTypeDTO;
import com.sams.entity.WarehouseType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WarehouseTypeRepository;
import com.sams.service.WarehouseTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WarehouseTypeServiceImpl implements WarehouseTypeService {

    private final WarehouseTypeRepository repository;

    @Override
    @Transactional
    public WarehouseTypeDTO create(WarehouseTypeDTO dto) {
        WarehouseType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WarehouseTypeDTO getById(Long id) {
        WarehouseType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WarehouseType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WarehouseTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WarehouseTypeDTO update(Long id, WarehouseTypeDTO dto) {
        WarehouseType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WarehouseType not found with ID: " + id));
        WarehouseType mapped = mapToEntity(dto);
        mapped.setWarehouseTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WarehouseType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WarehouseType not found with ID: " + id));
        repository.delete(entity);
    }

    private WarehouseType mapToEntity(WarehouseTypeDTO dto) {
        WarehouseType entity = new WarehouseType();
        entity.setWarehouseTypeId(dto.getWarehouseTypeId());
        entity.setWarehouseTypeName(dto.getWarehouseTypeName());
        entity.setWarehouseTypeDesc(dto.getWarehouseTypeDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WarehouseTypeDTO mapToDTO(WarehouseType entity) {
        WarehouseTypeDTO dto = new WarehouseTypeDTO();
        dto.setWarehouseTypeId(entity.getWarehouseTypeId());
        dto.setWarehouseTypeName(entity.getWarehouseTypeName());
        dto.setWarehouseTypeDesc(entity.getWarehouseTypeDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}