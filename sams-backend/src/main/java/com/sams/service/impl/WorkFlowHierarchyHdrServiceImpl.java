package com.sams.service.impl;

import com.sams.dto.WorkFlowHierarchyHdrDTO;
import com.sams.entity.WorkFlowHierarchyHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowHierarchyHdrRepository;
import com.sams.service.WorkFlowHierarchyHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowHierarchyHdrServiceImpl implements WorkFlowHierarchyHdrService {

    private final WorkFlowHierarchyHdrRepository repository;

    @Override
    @Transactional
    public WorkFlowHierarchyHdrDTO create(WorkFlowHierarchyHdrDTO dto) {
        WorkFlowHierarchyHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowHierarchyHdrDTO getById(Long id) {
        WorkFlowHierarchyHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowHierarchyHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowHierarchyHdrDTO update(Long id, WorkFlowHierarchyHdrDTO dto) {
        WorkFlowHierarchyHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyHdr not found with ID: " + id));
        WorkFlowHierarchyHdr mapped = mapToEntity(dto);
        mapped.setWorkFlowHierarchyHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowHierarchyHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowHierarchyHdr mapToEntity(WorkFlowHierarchyHdrDTO dto) {
        WorkFlowHierarchyHdr entity = new WorkFlowHierarchyHdr();
        entity.setWorkFlowHierarchyHdrId(dto.getWorkFlowHierarchyHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setProcessId(dto.getProcessId());
        entity.setProcessName(dto.getProcessName());
        entity.setWorkFlowName(dto.getWorkFlowName());
        entity.setWorkFlowDescId(dto.getWorkFlowDescId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowHierarchyHdrDTO mapToDTO(WorkFlowHierarchyHdr entity) {
        WorkFlowHierarchyHdrDTO dto = new WorkFlowHierarchyHdrDTO();
        dto.setWorkFlowHierarchyHdrId(entity.getWorkFlowHierarchyHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setProcessId(entity.getProcessId());
        dto.setProcessName(entity.getProcessName());
        dto.setWorkFlowName(entity.getWorkFlowName());
        dto.setWorkFlowDescId(entity.getWorkFlowDescId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}