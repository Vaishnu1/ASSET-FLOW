package com.sams.service.impl;

import com.sams.dto.C1DTO;
import com.sams.entity.C1;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.C1Repository;
import com.sams.service.C1Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class C1ServiceImpl implements C1Service {

    private final C1Repository repository;

    @Override
    @Transactional
    public C1DTO create(C1DTO dto) {
        C1 entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public C1DTO getById(Long id) {
        C1 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("C1 not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<C1DTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public C1DTO update(Long id, C1DTO dto) {
        C1 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("C1 not found with ID: " + id));
        C1 mapped = mapToEntity(dto);
        mapped.setCount(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        C1 entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("C1 not found with ID: " + id));
        repository.delete(entity);
    }

    private C1 mapToEntity(C1DTO dto) {
        C1 entity = new C1();
        entity.setCount(dto.getCount());
        return entity;
    }

    private C1DTO mapToDTO(C1 entity) {
        C1DTO dto = new C1DTO();
        dto.setCount(entity.getCount());
        return dto;
    }
}