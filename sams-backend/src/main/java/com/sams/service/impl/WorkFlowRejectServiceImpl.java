package com.sams.service.impl;

import com.sams.dto.WorkFlowRejectDTO;
import com.sams.entity.WorkFlowReject;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowRejectRepository;
import com.sams.service.WorkFlowRejectService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowRejectServiceImpl implements WorkFlowRejectService {

    private final WorkFlowRejectRepository repository;

    @Override
    @Transactional
    public WorkFlowRejectDTO create(WorkFlowRejectDTO dto) {
        WorkFlowReject entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowRejectDTO getById(Long id) {
        WorkFlowReject entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowReject not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowRejectDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowRejectDTO update(Long id, WorkFlowRejectDTO dto) {
        WorkFlowReject entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowReject not found with ID: " + id));
        WorkFlowReject mapped = mapToEntity(dto);
        mapped.setWorkFlowRejectId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowReject entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowReject not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowReject mapToEntity(WorkFlowRejectDTO dto) {
        WorkFlowReject entity = new WorkFlowReject();
        entity.setWorkFlowRejectId(dto.getWorkFlowRejectId());
        entity.setOrgId(dto.getOrgId());
        entity.setTransactionId(dto.getTransactionId());
        entity.setTransactionNo(dto.getTransactionNo());
        entity.setTransactionRemarks(dto.getTransactionRemarks());
        entity.setTransactionSource(dto.getTransactionSource());
        entity.setWorkFlowDescId(dto.getWorkFlowDescId());
        entity.setWorkFlowHierarchyHdrId(dto.getWorkFlowHierarchyHdrId());
        entity.setLevelName(dto.getLevelName());
        entity.setLevelSeqNo(dto.getLevelSeqNo());
        entity.setLevelApprovalStatus(dto.getLevelApprovalStatus());
        entity.setEmployeeId1(dto.getEmployeeId1());
        entity.setCondition1(dto.getCondition1());
        entity.setEmployeeId2(dto.getEmployeeId2());
        entity.setCondition2(dto.getCondition2());
        entity.setEmployeeId3(dto.getEmployeeId3());
        entity.setEmployee1ApprovalStatus(dto.getEmployee1ApprovalStatus());
        entity.setEmployee2ApprovalStatus(dto.getEmployee2ApprovalStatus());
        entity.setEmployee3ApprovalStatus(dto.getEmployee3ApprovalStatus());
        entity.setRejectRemarks(dto.getRejectRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowRejectDTO mapToDTO(WorkFlowReject entity) {
        WorkFlowRejectDTO dto = new WorkFlowRejectDTO();
        dto.setWorkFlowRejectId(entity.getWorkFlowRejectId());
        dto.setOrgId(entity.getOrgId());
        dto.setTransactionId(entity.getTransactionId());
        dto.setTransactionNo(entity.getTransactionNo());
        dto.setTransactionRemarks(entity.getTransactionRemarks());
        dto.setTransactionSource(entity.getTransactionSource());
        dto.setWorkFlowDescId(entity.getWorkFlowDescId());
        dto.setWorkFlowHierarchyHdrId(entity.getWorkFlowHierarchyHdrId());
        dto.setLevelName(entity.getLevelName());
        dto.setLevelSeqNo(entity.getLevelSeqNo());
        dto.setLevelApprovalStatus(entity.getLevelApprovalStatus());
        dto.setEmployeeId1(entity.getEmployeeId1());
        dto.setCondition1(entity.getCondition1());
        dto.setEmployeeId2(entity.getEmployeeId2());
        dto.setCondition2(entity.getCondition2());
        dto.setEmployeeId3(entity.getEmployeeId3());
        dto.setEmployee1ApprovalStatus(entity.getEmployee1ApprovalStatus());
        dto.setEmployee2ApprovalStatus(entity.getEmployee2ApprovalStatus());
        dto.setEmployee3ApprovalStatus(entity.getEmployee3ApprovalStatus());
        dto.setRejectRemarks(entity.getRejectRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}