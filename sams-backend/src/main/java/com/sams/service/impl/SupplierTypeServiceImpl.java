package com.sams.service.impl;

import com.sams.dto.SupplierTypeDTO;
import com.sams.entity.SupplierType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierTypeRepository;
import com.sams.service.SupplierTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierTypeServiceImpl implements SupplierTypeService {

    private final SupplierTypeRepository repository;

    @Override
    @Transactional
    public SupplierTypeDTO create(SupplierTypeDTO dto) {
        SupplierType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierTypeDTO getById(Long id) {
        SupplierType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierTypeDTO update(Long id, SupplierTypeDTO dto) {
        SupplierType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierType not found with ID: " + id));
        SupplierType mapped = mapToEntity(dto);
        mapped.setSupplierTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SupplierType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierType not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierType mapToEntity(SupplierTypeDTO dto) {
        SupplierType entity = new SupplierType();
        entity.setSupplierTypeId(dto.getSupplierTypeId());
        entity.setSupplierType(dto.getSupplierType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SupplierTypeDTO mapToDTO(SupplierType entity) {
        SupplierTypeDTO dto = new SupplierTypeDTO();
        dto.setSupplierTypeId(entity.getSupplierTypeId());
        dto.setSupplierType(entity.getSupplierType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}