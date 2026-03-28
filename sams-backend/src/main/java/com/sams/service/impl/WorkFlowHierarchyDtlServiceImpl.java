package com.sams.service.impl;

import com.sams.dto.WorkFlowHierarchyDtlDTO;
import com.sams.entity.WorkFlowHierarchyDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowHierarchyDtlRepository;
import com.sams.service.WorkFlowHierarchyDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowHierarchyDtlServiceImpl implements WorkFlowHierarchyDtlService {

    private final WorkFlowHierarchyDtlRepository repository;

    @Override
    @Transactional
    public WorkFlowHierarchyDtlDTO create(WorkFlowHierarchyDtlDTO dto) {
        WorkFlowHierarchyDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowHierarchyDtlDTO getById(Long id) {
        WorkFlowHierarchyDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowHierarchyDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowHierarchyDtlDTO update(Long id, WorkFlowHierarchyDtlDTO dto) {
        WorkFlowHierarchyDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyDtl not found with ID: " + id));
        WorkFlowHierarchyDtl mapped = mapToEntity(dto);
        mapped.setWorkFlowHierarchyDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowHierarchyDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowHierarchyDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowHierarchyDtl mapToEntity(WorkFlowHierarchyDtlDTO dto) {
        WorkFlowHierarchyDtl entity = new WorkFlowHierarchyDtl();
        entity.setWorkFlowHierarchyDtlId(dto.getWorkFlowHierarchyDtlId());
        entity.setWorkFlowHierarchyHdrId(dto.getWorkFlowHierarchyHdrId());
        entity.setLevelName(dto.getLevelName());
        entity.setLevelSeqNo(dto.getLevelSeqNo());
        entity.setEmployeeId1(dto.getEmployeeId1());
        entity.setCondition1(dto.getCondition1());
        entity.setEmployeeId2(dto.getEmployeeId2());
        entity.setCondition2(dto.getCondition2());
        entity.setEmployeeId3(dto.getEmployeeId3());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setProcessStatus(dto.getProcessStatus());
        entity.setApproveWithoutUnitPrice(dto.getApproveWithoutUnitPrice());
        entity.setApproveWithoutSupplier(dto.getApproveWithoutSupplier());
        entity.setWorkFlowProcessStatusId(dto.getWorkFlowProcessStatusId());
        return entity;
    }

    private WorkFlowHierarchyDtlDTO mapToDTO(WorkFlowHierarchyDtl entity) {
        WorkFlowHierarchyDtlDTO dto = new WorkFlowHierarchyDtlDTO();
        dto.setWorkFlowHierarchyDtlId(entity.getWorkFlowHierarchyDtlId());
        dto.setWorkFlowHierarchyHdrId(entity.getWorkFlowHierarchyHdrId());
        dto.setLevelName(entity.getLevelName());
        dto.setLevelSeqNo(entity.getLevelSeqNo());
        dto.setEmployeeId1(entity.getEmployeeId1());
        dto.setCondition1(entity.getCondition1());
        dto.setEmployeeId2(entity.getEmployeeId2());
        dto.setCondition2(entity.getCondition2());
        dto.setEmployeeId3(entity.getEmployeeId3());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setProcessStatus(entity.getProcessStatus());
        dto.setApproveWithoutUnitPrice(entity.getApproveWithoutUnitPrice());
        dto.setApproveWithoutSupplier(entity.getApproveWithoutSupplier());
        dto.setWorkFlowProcessStatusId(entity.getWorkFlowProcessStatusId());
        return dto;
    }
}