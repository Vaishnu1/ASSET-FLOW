package com.sams.service.impl;

import com.sams.dto.StoreLocAccessDTO;
import com.sams.entity.StoreLocAccess;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StoreLocAccessRepository;
import com.sams.service.StoreLocAccessService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreLocAccessServiceImpl implements StoreLocAccessService {

    private final StoreLocAccessRepository repository;

    @Override
    @Transactional
    public StoreLocAccessDTO create(StoreLocAccessDTO dto) {
        StoreLocAccess entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StoreLocAccessDTO getById(Long id) {
        StoreLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLocAccess not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StoreLocAccessDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StoreLocAccessDTO update(Long id, StoreLocAccessDTO dto) {
        StoreLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLocAccess not found with ID: " + id));
        StoreLocAccess mapped = mapToEntity(dto);
        mapped.setStoreLocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        StoreLocAccess entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLocAccess not found with ID: " + id));
        repository.delete(entity);
    }

    private StoreLocAccess mapToEntity(StoreLocAccessDTO dto) {
        StoreLocAccess entity = new StoreLocAccess();
        entity.setStoreLocId(dto.getStoreLocId());
        entity.setStoreId(dto.getStoreId());
        entity.setAccessLocId(dto.getAccessLocId());
        entity.setAccessLocName(dto.getAccessLocName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setOrgId(dto.getOrgId());
        return entity;
    }

    private StoreLocAccessDTO mapToDTO(StoreLocAccess entity) {
        StoreLocAccessDTO dto = new StoreLocAccessDTO();
        dto.setStoreLocId(entity.getStoreLocId());
        dto.setStoreId(entity.getStoreId());
        dto.setAccessLocId(entity.getAccessLocId());
        dto.setAccessLocName(entity.getAccessLocName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setOrgId(entity.getOrgId());
        return dto;
    }
}