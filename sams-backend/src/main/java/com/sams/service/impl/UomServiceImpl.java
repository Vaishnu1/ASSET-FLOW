package com.sams.service.impl;

import com.sams.dto.UomDTO;
import com.sams.entity.Uom;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.UomRepository;
import com.sams.service.UomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UomServiceImpl implements UomService {

    private final UomRepository repository;

    @Override
    @Transactional
    public UomDTO create(UomDTO dto) {
        Uom entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public UomDTO getById(Long id) {
        Uom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Uom not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<UomDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UomDTO update(Long id, UomDTO dto) {
        Uom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Uom not found with ID: " + id));
        Uom mapped = mapToEntity(dto);
        mapped.setUomId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Uom entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Uom not found with ID: " + id));
        repository.delete(entity);
    }

    private Uom mapToEntity(UomDTO dto) {
        Uom entity = new Uom();
        entity.setUomId(dto.getUomId());
        entity.setOrgId(dto.getOrgId());
        entity.setUomCode(dto.getUomCode());
        entity.setUomDesc(dto.getUomDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private UomDTO mapToDTO(Uom entity) {
        UomDTO dto = new UomDTO();
        dto.setUomId(entity.getUomId());
        dto.setOrgId(entity.getOrgId());
        dto.setUomCode(entity.getUomCode());
        dto.setUomDesc(entity.getUomDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}