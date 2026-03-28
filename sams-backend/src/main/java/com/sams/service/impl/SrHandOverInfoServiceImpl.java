package com.sams.service.impl;

import com.sams.dto.SrHandOverInfoDTO;
import com.sams.entity.SrHandOverInfo;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrHandOverInfoRepository;
import com.sams.service.SrHandOverInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrHandOverInfoServiceImpl implements SrHandOverInfoService {

    private final SrHandOverInfoRepository repository;

    @Override
    @Transactional
    public SrHandOverInfoDTO create(SrHandOverInfoDTO dto) {
        SrHandOverInfo entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrHandOverInfoDTO getById(Long id) {
        SrHandOverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrHandOverInfo not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrHandOverInfoDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrHandOverInfoDTO update(Long id, SrHandOverInfoDTO dto) {
        SrHandOverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrHandOverInfo not found with ID: " + id));
        SrHandOverInfo mapped = mapToEntity(dto);
        mapped.setSrHandOverId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrHandOverInfo entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrHandOverInfo not found with ID: " + id));
        repository.delete(entity);
    }

    private SrHandOverInfo mapToEntity(SrHandOverInfoDTO dto) {
        SrHandOverInfo entity = new SrHandOverInfo();
        entity.setSrHandOverId(dto.getSrHandOverId());
        entity.setSrId(dto.getSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setHandoverItemType(dto.getHandoverItemType());
        entity.setEmployeeId(dto.getEmployeeId());
        entity.setHandOverRemarks(dto.getHandOverRemarks());
        entity.setHandOverDt(dto.getHandOverDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrHandOverInfoDTO mapToDTO(SrHandOverInfo entity) {
        SrHandOverInfoDTO dto = new SrHandOverInfoDTO();
        dto.setSrHandOverId(entity.getSrHandOverId());
        dto.setSrId(entity.getSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setHandoverItemType(entity.getHandoverItemType());
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setHandOverRemarks(entity.getHandOverRemarks());
        dto.setHandOverDt(entity.getHandOverDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}