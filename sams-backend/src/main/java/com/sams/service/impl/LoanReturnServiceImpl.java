package com.sams.service.impl;

import com.sams.dto.LoanReturnDTO;
import com.sams.entity.LoanReturn;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LoanReturnRepository;
import com.sams.service.LoanReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoanReturnServiceImpl implements LoanReturnService {

    private final LoanReturnRepository repository;

    @Override
    @Transactional
    public LoanReturnDTO create(LoanReturnDTO dto) {
        LoanReturn entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LoanReturnDTO getById(Long id) {
        LoanReturn entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanReturn not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LoanReturnDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LoanReturnDTO update(Long id, LoanReturnDTO dto) {
        LoanReturn entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanReturn not found with ID: " + id));
        LoanReturn mapped = mapToEntity(dto);
        mapped.setLoanId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LoanReturn entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LoanReturn not found with ID: " + id));
        repository.delete(entity);
    }

    private LoanReturn mapToEntity(LoanReturnDTO dto) {
        LoanReturn entity = new LoanReturn();
        entity.setLoanId(dto.getLoanId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setLoanNo(dto.getLoanNo());
        entity.setGroupNo(dto.getGroupNo());
        entity.setLoanedTo(dto.getLoanedTo());
        entity.setLoanedToId(dto.getLoanedToId());
        entity.setLoanedToSiteId(dto.getLoanedToSiteId());
        entity.setLoanedPersonName(dto.getLoanedPersonName());
        entity.setLoanedPersonContactNo(dto.getLoanedPersonContactNo());
        entity.setLoanedPersonEmailId(dto.getLoanedPersonEmailId());
        entity.setLoanedAssetConditionId(dto.getLoanedAssetConditionId());
        entity.setLoanedRemarks(dto.getLoanedRemarks());
        entity.setLoanType(dto.getLoanType());
        entity.setContractNo(dto.getContractNo());
        entity.setLoanStatusId(dto.getLoanStatusId());
        entity.setLoanStartDate(dto.getLoanStartDate());
        entity.setLoanEndDate(dto.getLoanEndDate());
        entity.setDateOfReturn(dto.getDateOfReturn());
        entity.setReturnAssetConditionId(dto.getReturnAssetConditionId());
        entity.setReturnById(dto.getReturnById());
        entity.setReturnReceivedById(dto.getReturnReceivedById());
        entity.setReturnRemarks(dto.getReturnRemarks());
        entity.setReturnToDeptId(dto.getReturnToDeptId());
        entity.setReturnToDeptName(dto.getReturnToDeptName());
        entity.setAssetPreviousStatusId(dto.getAssetPreviousStatusId());
        entity.setRemarks(dto.getRemarks());
        entity.setExpReturnDate(dto.getExpReturnDate());
        entity.setFromDeptId(dto.getFromDeptId());
        entity.setToDeptId(dto.getToDeptId());
        entity.setSourceScreen(dto.getSourceScreen());
        entity.setFromDeptInchargeId(dto.getFromDeptInchargeId());
        entity.setToDeptInchargeId(dto.getToDeptInchargeId());
        entity.setAssetPicId(dto.getAssetPicId());
        entity.setLoanApprovedBy(dto.getLoanApprovedBy());
        entity.setLoanApprovedDt(dto.getLoanApprovedDt());
        entity.setReceivedApprovedBy(dto.getReceivedApprovedBy());
        entity.setReceivedApprovedDt(dto.getReceivedApprovedDt());
        entity.setLoanReceivedBy(dto.getLoanReceivedBy());
        entity.setLoanReceivedDt(dto.getLoanReceivedDt());
        entity.setReturnAuthorizedBy(dto.getReturnAuthorizedBy());
        entity.setReturnAuthorizedDt(dto.getReturnAuthorizedDt());
        entity.setReturnApprovedBy(dto.getReturnApprovedBy());
        entity.setReturnApprovedDt(dto.getReturnApprovedDt());
        entity.setActualDateOfReturn(dto.getActualDateOfReturn());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setLoanReturnedBy(dto.getLoanReturnedBy());
        entity.setLoanReturnedByContactNo(dto.getLoanReturnedByContactNo());
        entity.setLoanReturnedByEmailId(dto.getLoanReturnedByEmailId());
        return entity;
    }

    private LoanReturnDTO mapToDTO(LoanReturn entity) {
        LoanReturnDTO dto = new LoanReturnDTO();
        dto.setLoanId(entity.getLoanId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setLoanNo(entity.getLoanNo());
        dto.setGroupNo(entity.getGroupNo());
        dto.setLoanedTo(entity.getLoanedTo());
        dto.setLoanedToId(entity.getLoanedToId());
        dto.setLoanedToSiteId(entity.getLoanedToSiteId());
        dto.setLoanedPersonName(entity.getLoanedPersonName());
        dto.setLoanedPersonContactNo(entity.getLoanedPersonContactNo());
        dto.setLoanedPersonEmailId(entity.getLoanedPersonEmailId());
        dto.setLoanedAssetConditionId(entity.getLoanedAssetConditionId());
        dto.setLoanedRemarks(entity.getLoanedRemarks());
        dto.setLoanType(entity.getLoanType());
        dto.setContractNo(entity.getContractNo());
        dto.setLoanStatusId(entity.getLoanStatusId());
        dto.setLoanStartDate(entity.getLoanStartDate());
        dto.setLoanEndDate(entity.getLoanEndDate());
        dto.setDateOfReturn(entity.getDateOfReturn());
        dto.setReturnAssetConditionId(entity.getReturnAssetConditionId());
        dto.setReturnById(entity.getReturnById());
        dto.setReturnReceivedById(entity.getReturnReceivedById());
        dto.setReturnRemarks(entity.getReturnRemarks());
        dto.setReturnToDeptId(entity.getReturnToDeptId());
        dto.setReturnToDeptName(entity.getReturnToDeptName());
        dto.setAssetPreviousStatusId(entity.getAssetPreviousStatusId());
        dto.setRemarks(entity.getRemarks());
        dto.setExpReturnDate(entity.getExpReturnDate());
        dto.setFromDeptId(entity.getFromDeptId());
        dto.setToDeptId(entity.getToDeptId());
        dto.setSourceScreen(entity.getSourceScreen());
        dto.setFromDeptInchargeId(entity.getFromDeptInchargeId());
        dto.setToDeptInchargeId(entity.getToDeptInchargeId());
        dto.setAssetPicId(entity.getAssetPicId());
        dto.setLoanApprovedBy(entity.getLoanApprovedBy());
        dto.setLoanApprovedDt(entity.getLoanApprovedDt());
        dto.setReceivedApprovedBy(entity.getReceivedApprovedBy());
        dto.setReceivedApprovedDt(entity.getReceivedApprovedDt());
        dto.setLoanReceivedBy(entity.getLoanReceivedBy());
        dto.setLoanReceivedDt(entity.getLoanReceivedDt());
        dto.setReturnAuthorizedBy(entity.getReturnAuthorizedBy());
        dto.setReturnAuthorizedDt(entity.getReturnAuthorizedDt());
        dto.setReturnApprovedBy(entity.getReturnApprovedBy());
        dto.setReturnApprovedDt(entity.getReturnApprovedDt());
        dto.setActualDateOfReturn(entity.getActualDateOfReturn());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setLoanReturnedBy(entity.getLoanReturnedBy());
        dto.setLoanReturnedByContactNo(entity.getLoanReturnedByContactNo());
        dto.setLoanReturnedByEmailId(entity.getLoanReturnedByEmailId());
        return dto;
    }
}