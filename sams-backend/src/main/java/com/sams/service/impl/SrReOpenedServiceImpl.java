package com.sams.service.impl;

import com.sams.dto.SrReOpenedDTO;
import com.sams.entity.SrReOpened;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrReOpenedRepository;
import com.sams.service.SrReOpenedService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrReOpenedServiceImpl implements SrReOpenedService {

    private final SrReOpenedRepository repository;

    @Override
    @Transactional
    public SrReOpenedDTO create(SrReOpenedDTO dto) {
        SrReOpened entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrReOpenedDTO getById(Long id) {
        SrReOpened entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrReOpened not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrReOpenedDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrReOpenedDTO update(Long id, SrReOpenedDTO dto) {
        SrReOpened entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrReOpened not found with ID: " + id));
        SrReOpened mapped = mapToEntity(dto);
        mapped.setSrReOpenedId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrReOpened entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrReOpened not found with ID: " + id));
        repository.delete(entity);
    }

    private SrReOpened mapToEntity(SrReOpenedDTO dto) {
        SrReOpened entity = new SrReOpened();
        entity.setSrReOpenedId(dto.getSrReOpenedId());
        entity.setOrgId(dto.getOrgId());
        entity.setSrId(dto.getSrId());
        entity.setReOpenedById(dto.getReOpenedById());
        entity.setReOpenedBy(dto.getReOpenedBy());
        entity.setReOpenedDt(dto.getReOpenedDt());
        entity.setReOpenedRemarks(dto.getReOpenedRemarks());
        entity.setReOpenedCompletedDt(dto.getReOpenedCompletedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SrReOpenedDTO mapToDTO(SrReOpened entity) {
        SrReOpenedDTO dto = new SrReOpenedDTO();
        dto.setSrReOpenedId(entity.getSrReOpenedId());
        dto.setOrgId(entity.getOrgId());
        dto.setSrId(entity.getSrId());
        dto.setReOpenedById(entity.getReOpenedById());
        dto.setReOpenedBy(entity.getReOpenedBy());
        dto.setReOpenedDt(entity.getReOpenedDt());
        dto.setReOpenedRemarks(entity.getReOpenedRemarks());
        dto.setReOpenedCompletedDt(entity.getReOpenedCompletedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}