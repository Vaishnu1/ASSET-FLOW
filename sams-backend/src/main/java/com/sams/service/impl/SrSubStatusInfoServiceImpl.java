package com.sams.service.impl;

import com.sams.dto.SrSubStatusInfoDTO;
import com.sams.entity.SrSubStatusInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrSubStatusInfoRepository;
import com.sams.service.SrSubStatusInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrSubStatusInfoServiceImpl implements SrSubStatusInfoService {

    private final SrSubStatusInfoRepository repository;

    @Override
    @Transactional
    public SrSubStatusInfoDTO create(SrSubStatusInfoDTO dto) {
        SrSubStatusInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrSubStatusInfoDTO getById(Long id) {
        SrSubStatusInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatusInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrSubStatusInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrSubStatusInfoDTO update(Long id, SrSubStatusInfoDTO dto) {
        SrSubStatusInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatusInfo not found with ID: " + id));
        SrSubStatusInfo mapped = mapToEntity(dto);
        mapped.setSrSubStatusInfoId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrSubStatusInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrSubStatusInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private SrSubStatusInfo mapToEntity(SrSubStatusInfoDTO dto) {
        SrSubStatusInfo entity = new SrSubStatusInfo();
        entity.setSrSubStatusInfoId(dto.getSrSubStatusInfoId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setSrId(dto.getSrId());
        entity.setSrNo(dto.getSrNo());
        entity.setSrSubStatusId(dto.getSrSubStatusId());
        entity.setSrSubStatusName(dto.getSrSubStatusName());
        entity.setModuleRef(dto.getModuleRef());
        entity.setActive(dto.getActive());
        entity.setTransId(dto.getTransId());
        entity.setTransSource(dto.getTransSource());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrSubStatusInfoDTO mapToDTO(SrSubStatusInfo entity) {
        SrSubStatusInfoDTO dto = new SrSubStatusInfoDTO();
        dto.setSrSubStatusInfoId(entity.getSrSubStatusInfoId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setSrId(entity.getSrId());
        dto.setSrNo(entity.getSrNo());
        dto.setSrSubStatusId(entity.getSrSubStatusId());
        dto.setSrSubStatusName(entity.getSrSubStatusName());
        dto.setModuleRef(entity.getModuleRef());
        dto.setActive(entity.getActive());
        dto.setTransId(entity.getTransId());
        dto.setTransSource(entity.getTransSource());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}