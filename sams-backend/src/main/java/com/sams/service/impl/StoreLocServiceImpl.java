package com.sams.service.impl;

import com.sams.dto.StoreLocDTO;
import com.sams.entity.StoreLoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StoreLocRepository;
import com.sams.service.StoreLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreLocServiceImpl implements StoreLocService {

    private final StoreLocRepository repository;

    @Override
    @Transactional
    public StoreLocDTO createStoreLoc(StoreLocDTO dto) {
        StoreLoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StoreLocDTO getStoreLocById(Long id) {
        StoreLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StoreLocDTO> getAllStoreLocs() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StoreLocDTO updateStoreLoc(Long id, StoreLocDTO dto) {
        StoreLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLoc not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        StoreLoc mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteStoreLoc(Long id) {
        StoreLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StoreLoc not found with ID: " + id));
        repository.delete(entity);
    }

    private StoreLoc mapToEntity(StoreLocDTO dto) {
        StoreLoc entity = new StoreLoc();
        entity.setStoreLocId(dto.getStoreLocId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        return entity;
    }

    private StoreLocDTO mapToDTO(StoreLoc entity) {
        StoreLocDTO dto = new StoreLocDTO();
        dto.setId(entity.getId());
        dto.setStoreLocId(entity.getStoreLocId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        return dto;
    }
}