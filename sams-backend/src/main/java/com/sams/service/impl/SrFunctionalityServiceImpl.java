package com.sams.service.impl;

import com.sams.dto.SrFunctionalityDTO;
import com.sams.entity.SrFunctionality;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrFunctionalityRepository;
import com.sams.service.SrFunctionalityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrFunctionalityServiceImpl implements SrFunctionalityService {

    private final SrFunctionalityRepository repository;

    @Override
    @Transactional
    public SrFunctionalityDTO create(SrFunctionalityDTO dto) {
        SrFunctionality entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrFunctionalityDTO getById(Long id) {
        SrFunctionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrFunctionality not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrFunctionalityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrFunctionalityDTO update(Long id, SrFunctionalityDTO dto) {
        SrFunctionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrFunctionality not found with ID: " + id));
        SrFunctionality mapped = mapToEntity(dto);
        mapped.setFunctionalityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrFunctionality entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrFunctionality not found with ID: " + id));
        repository.delete(entity);
    }

    private SrFunctionality mapToEntity(SrFunctionalityDTO dto) {
        SrFunctionality entity = new SrFunctionality();
        entity.setFunctionalityId(dto.getFunctionalityId());
        entity.setOrgId(dto.getOrgId());
        entity.setFunctionalityName(dto.getFunctionalityName());
        return entity;
    }

    private SrFunctionalityDTO mapToDTO(SrFunctionality entity) {
        SrFunctionalityDTO dto = new SrFunctionalityDTO();
        dto.setFunctionalityId(entity.getFunctionalityId());
        dto.setOrgId(entity.getOrgId());
        dto.setFunctionalityName(entity.getFunctionalityName());
        return dto;
    }
}