package com.sams.service.impl;

import com.sams.dto.PartnerRolesMapDTO;
import com.sams.entity.PartnerRolesMap;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PartnerRolesMapRepository;
import com.sams.service.PartnerRolesMapService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PartnerRolesMapServiceImpl implements PartnerRolesMapService {

    private final PartnerRolesMapRepository repository;

    @Override
    @Transactional
    public PartnerRolesMapDTO create(PartnerRolesMapDTO dto) {
        PartnerRolesMap entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PartnerRolesMapDTO getById(Long id) {
        PartnerRolesMap entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PartnerRolesMap not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PartnerRolesMapDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PartnerRolesMapDTO update(Long id, PartnerRolesMapDTO dto) {
        PartnerRolesMap entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PartnerRolesMap not found with ID: " + id));
        PartnerRolesMap mapped = mapToEntity(dto);
        mapped.setPartnerRolesMapId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PartnerRolesMap entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PartnerRolesMap not found with ID: " + id));
        repository.delete(entity);
    }

    private PartnerRolesMap mapToEntity(PartnerRolesMapDTO dto) {
        PartnerRolesMap entity = new PartnerRolesMap();
        entity.setPartnerRolesMapId(dto.getPartnerRolesMapId());
        entity.setOrgId(dto.getOrgId());
        entity.setBusinessPartnerId(dto.getBusinessPartnerId());
        entity.setBusinessPartnerRoleId(dto.getBusinessPartnerRoleId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PartnerRolesMapDTO mapToDTO(PartnerRolesMap entity) {
        PartnerRolesMapDTO dto = new PartnerRolesMapDTO();
        dto.setPartnerRolesMapId(entity.getPartnerRolesMapId());
        dto.setOrgId(entity.getOrgId());
        dto.setBusinessPartnerId(entity.getBusinessPartnerId());
        dto.setBusinessPartnerRoleId(entity.getBusinessPartnerRoleId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}