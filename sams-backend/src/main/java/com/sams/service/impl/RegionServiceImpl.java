package com.sams.service.impl;

import com.sams.dto.RegionDTO;
import com.sams.entity.Region;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RegionRepository;
import com.sams.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RegionServiceImpl implements RegionService {

    private final RegionRepository repository;

    @Override
    @Transactional
    public RegionDTO create(RegionDTO dto) {
        Region entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RegionDTO getById(Long id) {
        Region entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Region not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RegionDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RegionDTO update(Long id, RegionDTO dto) {
        Region entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Region not found with ID: " + id));
        Region mapped = mapToEntity(dto);
        mapped.setRegionId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Region entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Region not found with ID: " + id));
        repository.delete(entity);
    }

    private Region mapToEntity(RegionDTO dto) {
        Region entity = new Region();
        entity.setRegionId(dto.getRegionId());
        entity.setOrgId(dto.getOrgId());
        entity.setRegionName(dto.getRegionName());
        entity.setRegionCode(dto.getRegionCode());
        entity.setRegionDesc(dto.getRegionDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RegionDTO mapToDTO(Region entity) {
        RegionDTO dto = new RegionDTO();
        dto.setRegionId(entity.getRegionId());
        dto.setOrgId(entity.getOrgId());
        dto.setRegionName(entity.getRegionName());
        dto.setRegionCode(entity.getRegionCode());
        dto.setRegionDesc(entity.getRegionDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}