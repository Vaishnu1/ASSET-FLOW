package com.sams.service.impl;

import com.sams.dto.PurchasingTypeDTO;
import com.sams.entity.PurchasingType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchasingTypeRepository;
import com.sams.service.PurchasingTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchasingTypeServiceImpl implements PurchasingTypeService {

    private final PurchasingTypeRepository repository;

    @Override
    @Transactional
    public PurchasingTypeDTO create(PurchasingTypeDTO dto) {
        PurchasingType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchasingTypeDTO getById(Long id) {
        PurchasingType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchasingTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchasingTypeDTO update(Long id, PurchasingTypeDTO dto) {
        PurchasingType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingType not found with ID: " + id));
        PurchasingType mapped = mapToEntity(dto);
        mapped.setPurchasingTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchasingType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchasingType not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchasingType mapToEntity(PurchasingTypeDTO dto) {
        PurchasingType entity = new PurchasingType();
        entity.setPurchasingTypeId(dto.getPurchasingTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setPurchasingTypeName(dto.getPurchasingTypeName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setModule(dto.getModule());
        return entity;
    }

    private PurchasingTypeDTO mapToDTO(PurchasingType entity) {
        PurchasingTypeDTO dto = new PurchasingTypeDTO();
        dto.setPurchasingTypeId(entity.getPurchasingTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setPurchasingTypeName(entity.getPurchasingTypeName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setModule(entity.getModule());
        return dto;
    }
}