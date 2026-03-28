package com.sams.service.impl;

import com.sams.dto.StoreTypeDTO;
import com.sams.entity.StoreType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StoreTypeRepository;
import com.sams.service.StoreTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreTypeServiceImpl implements StoreTypeService {

    private final StoreTypeRepository repository;

    @Override
    @Transactional
    public StoreTypeDTO create(StoreTypeDTO dto) {
        StoreType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StoreTypeDTO getById(Long id) {
        StoreType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StoreTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StoreTypeDTO update(Long id, StoreTypeDTO dto) {
        StoreType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreType not found with ID: " + id));
        StoreType mapped = mapToEntity(dto);
        mapped.setStoreTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StoreType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreType not found with ID: " + id));
        repository.delete(entity);
    }

    private StoreType mapToEntity(StoreTypeDTO dto) {
        StoreType entity = new StoreType();
        entity.setStoreTypeId(dto.getStoreTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setStoreTypeName(dto.getStoreTypeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private StoreTypeDTO mapToDTO(StoreType entity) {
        StoreTypeDTO dto = new StoreTypeDTO();
        dto.setStoreTypeId(entity.getStoreTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setStoreTypeName(entity.getStoreTypeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}