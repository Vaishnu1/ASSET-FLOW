package com.sams.service.impl;

import com.sams.dto.FunctionalityDTO;
import com.sams.entity.Functionality;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.FunctionalityRepository;
import com.sams.service.FunctionalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FunctionalityServiceImpl implements FunctionalityService {

    private final FunctionalityRepository repository;

    @Override
    @Transactional
    public FunctionalityDTO create(FunctionalityDTO dto) {
        Functionality entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public FunctionalityDTO getById(Long id) {
        Functionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Functionality not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<FunctionalityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public FunctionalityDTO update(Long id, FunctionalityDTO dto) {
        Functionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Functionality not found with ID: " + id));
        Functionality mapped = mapToEntity(dto);
        mapped.setFunctionalityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Functionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Functionality not found with ID: " + id));
        repository.delete(entity);
    }

    private Functionality mapToEntity(FunctionalityDTO dto) {
        Functionality entity = new Functionality();
        entity.setFunctionalityId(dto.getFunctionalityId());
        entity.setOrgId(dto.getOrgId());
        entity.setFunctionalityName(dto.getFunctionalityName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private FunctionalityDTO mapToDTO(Functionality entity) {
        FunctionalityDTO dto = new FunctionalityDTO();
        dto.setFunctionalityId(entity.getFunctionalityId());
        dto.setOrgId(entity.getOrgId());
        dto.setFunctionalityName(entity.getFunctionalityName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}