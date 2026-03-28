package com.sams.service.impl;

import com.sams.dto.StoreDTO;
import com.sams.entity.Store;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.StoreRepository;
import com.sams.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreRepository repository;

    @Override
    @Transactional
    public StoreDTO createStore(StoreDTO dto) {
        Store entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public StoreDTO getStoreById(Long id) {
        Store entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<StoreDTO> getAllStores() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public StoreDTO updateStore(Long id, StoreDTO dto) {
        Store entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        Store mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteStore(Long id) {
        Store entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Store not found with ID: " + id));
        repository.delete(entity);
    }

    private Store mapToEntity(StoreDTO dto) {
        Store entity = new Store();
        entity.setStoreId(dto.getStoreId());
        entity.setStoreName(dto.getStoreName());
        entity.setStoreCode(dto.getStoreCode());
        entity.setStoreDescription(dto.getStoreDescription());
        entity.setInchargeName(dto.getInchargeName());
        entity.setInchargeId(dto.getInchargeId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        return entity;
    }

    private StoreDTO mapToDTO(Store entity) {
        StoreDTO dto = new StoreDTO();
        dto.setId(entity.getId());
        dto.setStoreId(entity.getStoreId());
        dto.setStoreName(entity.getStoreName());
        dto.setStoreCode(entity.getStoreCode());
        dto.setStoreDescription(entity.getStoreDescription());
        dto.setInchargeName(entity.getInchargeName());
        dto.setInchargeId(entity.getInchargeId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        return dto;
    }
}