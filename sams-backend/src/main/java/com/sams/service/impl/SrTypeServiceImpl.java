package com.sams.service.impl;

import com.sams.dto.SrTypeDTO;
import com.sams.entity.SrType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrTypeRepository;
import com.sams.service.SrTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrTypeServiceImpl implements SrTypeService {

    private final SrTypeRepository repository;

    @Override
    @Transactional
    public SrTypeDTO create(SrTypeDTO dto) {
        SrType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrTypeDTO getById(Long id) {
        SrType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrTypeDTO update(Long id, SrTypeDTO dto) {
        SrType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrType not found with ID: " + id));
        SrType mapped = mapToEntity(dto);
        mapped.setSrTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrType not found with ID: " + id));
        repository.delete(entity);
    }

    private SrType mapToEntity(SrTypeDTO dto) {
        SrType entity = new SrType();
        entity.setSrTypeId(dto.getSrTypeId());
        entity.setSrId(dto.getSrId());
        entity.setSrTypeName(dto.getSrTypeName());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        entity.setForScheduleMaintenance(dto.getForScheduleMaintenance());
        return entity;
    }

    private SrTypeDTO mapToDTO(SrType entity) {
        SrTypeDTO dto = new SrTypeDTO();
        dto.setSrTypeId(entity.getSrTypeId());
        dto.setSrId(entity.getSrId());
        dto.setSrTypeName(entity.getSrTypeName());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        dto.setForScheduleMaintenance(entity.getForScheduleMaintenance());
        return dto;
    }
}