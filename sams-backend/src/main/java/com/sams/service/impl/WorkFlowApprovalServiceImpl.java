package com.sams.service.impl;

import com.sams.dto.WorkFlowApprovalDTO;
import com.sams.entity.WorkFlowApproval;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowApprovalRepository;
import com.sams.service.WorkFlowApprovalService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowApprovalServiceImpl implements WorkFlowApprovalService {

    private final WorkFlowApprovalRepository repository;

    @Override
    @Transactional
    public WorkFlowApprovalDTO create(WorkFlowApprovalDTO dto) {
        WorkFlowApproval entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowApprovalDTO getById(Long id) {
        WorkFlowApproval entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowApproval not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowApprovalDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowApprovalDTO update(Long id, WorkFlowApprovalDTO dto) {
        WorkFlowApproval entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowApproval not found with ID: " + id));
        WorkFlowApproval mapped = mapToEntity(dto);
        mapped.setWorkFlowApprovalId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowApproval entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowApproval not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowApproval mapToEntity(WorkFlowApprovalDTO dto) {
        WorkFlowApproval entity = new WorkFlowApproval();
        entity.setWorkFlowApprovalId(dto.getWorkFlowApprovalId());
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
        entity.setEmployee1ReadFlag(dto.getEmployee1ReadFlag());
        entity.setEmployee2ReadFlag(dto.getEmployee2ReadFlag());
        entity.setEmployee3ReadFlag(dto.getEmployee3ReadFlag());
        entity.setApprovalSupercededBy(dto.getApprovalSupercededBy());
        entity.setApprovalSupercededDate(dto.getApprovalSupercededDate());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setProcessStatus(dto.getProcessStatus());
        return entity;
    }

    private WorkFlowApprovalDTO mapToDTO(WorkFlowApproval entity) {
        WorkFlowApprovalDTO dto = new WorkFlowApprovalDTO();
        dto.setWorkFlowApprovalId(entity.getWorkFlowApprovalId());
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
        dto.setEmployee1ReadFlag(entity.getEmployee1ReadFlag());
        dto.setEmployee2ReadFlag(entity.getEmployee2ReadFlag());
        dto.setEmployee3ReadFlag(entity.getEmployee3ReadFlag());
        dto.setApprovalSupercededBy(entity.getApprovalSupercededBy());
        dto.setApprovalSupercededDate(entity.getApprovalSupercededDate());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setProcessStatus(entity.getProcessStatus());
        return dto;
    }
}