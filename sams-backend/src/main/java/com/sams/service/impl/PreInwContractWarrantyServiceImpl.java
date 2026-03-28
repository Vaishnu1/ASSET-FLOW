package com.sams.service.impl;

import com.sams.dto.PreInwContractWarrantyDTO;
import com.sams.entity.PreInwContractWarranty;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PreInwContractWarrantyRepository;
import com.sams.service.PreInwContractWarrantyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PreInwContractWarrantyServiceImpl implements PreInwContractWarrantyService {

    private final PreInwContractWarrantyRepository repository;

    @Override
    @Transactional
    public PreInwContractWarrantyDTO create(PreInwContractWarrantyDTO dto) {
        PreInwContractWarranty entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PreInwContractWarrantyDTO getById(Long id) {
        PreInwContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwContractWarranty not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PreInwContractWarrantyDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PreInwContractWarrantyDTO update(Long id, PreInwContractWarrantyDTO dto) {
        PreInwContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwContractWarranty not found with ID: " + id));
        PreInwContractWarranty mapped = mapToEntity(dto);
        mapped.setPreInwContractWarrantyId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PreInwContractWarranty entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PreInwContractWarranty not found with ID: " + id));
        repository.delete(entity);
    }

    private PreInwContractWarranty mapToEntity(PreInwContractWarrantyDTO dto) {
        PreInwContractWarranty entity = new PreInwContractWarranty();
        entity.setPreInwContractWarrantyId(dto.getPreInwContractWarrantyId());
        entity.setInwardInventoryDtlId(dto.getInwardInventoryDtlId());
        entity.setSeqNo(dto.getSeqNo());
        entity.setCoverageTypeId(dto.getCoverageTypeId());
        entity.setContractTypeId(dto.getContractTypeId());
        entity.setCoverageStartingFrom(dto.getCoverageStartingFrom());
        entity.setPeriodInYears(dto.getPeriodInYears());
        entity.setPeriodInMonths(dto.getPeriodInMonths());
        entity.setIncludedServices(dto.getIncludedServices());
        entity.setExcludedServices(dto.getExcludedServices());
        entity.setAmcCmcValue(dto.getAmcCmcValue());
        entity.setAmcCmcPercentage(dto.getAmcCmcPercentage());
        entity.setNextAmcCmcEscalationPer(dto.getNextAmcCmcEscalationPer());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PreInwContractWarrantyDTO mapToDTO(PreInwContractWarranty entity) {
        PreInwContractWarrantyDTO dto = new PreInwContractWarrantyDTO();
        dto.setPreInwContractWarrantyId(entity.getPreInwContractWarrantyId());
        dto.setInwardInventoryDtlId(entity.getInwardInventoryDtlId());
        dto.setSeqNo(entity.getSeqNo());
        dto.setCoverageTypeId(entity.getCoverageTypeId());
        dto.setContractTypeId(entity.getContractTypeId());
        dto.setCoverageStartingFrom(entity.getCoverageStartingFrom());
        dto.setPeriodInYears(entity.getPeriodInYears());
        dto.setPeriodInMonths(entity.getPeriodInMonths());
        dto.setIncludedServices(entity.getIncludedServices());
        dto.setExcludedServices(entity.getExcludedServices());
        dto.setAmcCmcValue(entity.getAmcCmcValue());
        dto.setAmcCmcPercentage(entity.getAmcCmcPercentage());
        dto.setNextAmcCmcEscalationPer(entity.getNextAmcCmcEscalationPer());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}