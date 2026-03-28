package com.sams.service.impl;

import com.sams.dto.LockDTO;
import com.sams.entity.Lock;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LockRepository;
import com.sams.service.LockService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LockServiceImpl implements LockService {

    private final LockRepository repository;

    @Override
    @Transactional
    public LockDTO create(LockDTO dto) {
        Lock entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LockDTO getById(Long id) {
        Lock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lock not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LockDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LockDTO update(Long id, LockDTO dto) {
        Lock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lock not found with ID: " + id));
        Lock mapped = mapToEntity(dto);
        mapped.setOrgId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Lock entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Lock not found with ID: " + id));
        repository.delete(entity);
    }

    private Lock mapToEntity(LockDTO dto) {
        Lock entity = new Lock();
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setUserId(dto.getUserId());
        entity.setLoginId(dto.getLoginId());
        entity.setModuleId(dto.getModuleId());
        entity.setKeyValue(dto.getKeyValue());
        entity.setLockTime(dto.getLockTime());
        return entity;
    }

    private LockDTO mapToDTO(Lock entity) {
        LockDTO dto = new LockDTO();
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setUserId(entity.getUserId());
        dto.setLoginId(entity.getLoginId());
        dto.setModuleId(entity.getModuleId());
        dto.setKeyValue(entity.getKeyValue());
        dto.setLockTime(entity.getLockTime());
        return dto;
    }
}