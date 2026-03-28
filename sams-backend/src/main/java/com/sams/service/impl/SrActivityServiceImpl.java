package com.sams.service.impl;

import com.sams.dto.SrActivityDTO;
import com.sams.entity.SrActivity;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrActivityRepository;
import com.sams.service.SrActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrActivityServiceImpl implements SrActivityService {

    private final SrActivityRepository repository;

    @Override
    @Transactional
    public SrActivityDTO create(SrActivityDTO dto) {
        SrActivity entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrActivityDTO getById(Long id) {
        SrActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivity not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrActivityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrActivityDTO update(Long id, SrActivityDTO dto) {
        SrActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivity not found with ID: " + id));
        SrActivity mapped = mapToEntity(dto);
        mapped.setSrActivityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrActivity entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrActivity not found with ID: " + id));
        repository.delete(entity);
    }

    private SrActivity mapToEntity(SrActivityDTO dto) {
        SrActivity entity = new SrActivity();
        entity.setSrActivityId(dto.getSrActivityId());
        entity.setSrId(dto.getSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setActivityDoneBy(dto.getActivityDoneBy());
        entity.setInternalEngineerId(dto.getInternalEngineerId());
        entity.setInternalEngineerName(dto.getInternalEngineerName());
        entity.setExternalEngineerName(dto.getExternalEngineerName());
        entity.setExternalEngineerContactNo(dto.getExternalEngineerContactNo());
        entity.setExternalEngineerEmailId(dto.getExternalEngineerEmailId());
        entity.setServiceProvidedBy(dto.getServiceProvidedBy());
        entity.setServiceProvidedById(dto.getServiceProvidedById());
        entity.setServiceProvidedByName(dto.getServiceProvidedByName());
        entity.setActivityDt(dto.getActivityDt());
        entity.setActivityStartDt(dto.getActivityStartDt());
        entity.setActivityEndDt(dto.getActivityEndDt());
        entity.setActivityStartTime(dto.getActivityStartTime());
        entity.setActivityEndTime(dto.getActivityEndTime());
        entity.setTotalHrs(dto.getTotalHrs());
        entity.setActivityDone(dto.getActivityDone());
        entity.setInternalEngineerRemarks(dto.getInternalEngineerRemarks());
        entity.setExternalEngineerRemarks(dto.getExternalEngineerRemarks());
        entity.setInternalEngineerCost(dto.getInternalEngineerCost());
        entity.setHoldFlag(dto.getHoldFlag());
        entity.setHoldStartDt(dto.getHoldStartDt());
        entity.setHoldEndDt(dto.getHoldEndDt());
        entity.setHoldStartTime(dto.getHoldStartTime());
        entity.setHoldEndTime(dto.getHoldEndTime());
        entity.setCalibrationRemarks(dto.getCalibrationRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPhysicalDamage(dto.getPhysicalDamage());
        entity.setPhysicalDamageDescription(dto.getPhysicalDamageDescription());
        entity.setFindings(dto.getFindings());
        entity.setFindingsDescription(dto.getFindingsDescription());
        entity.setCorrectiveActions(dto.getCorrectiveActions());
        entity.setPatientSafety(dto.getPatientSafety());
        entity.setPatientSafetyDescription(dto.getPatientSafetyDescription());
        entity.setEfs(dto.getEfs());
        entity.setEfsId(dto.getEfsId());
        entity.setActivityStatusFlag(dto.getActivityStatusFlag());
        return entity;
    }

    private SrActivityDTO mapToDTO(SrActivity entity) {
        SrActivityDTO dto = new SrActivityDTO();
        dto.setSrActivityId(entity.getSrActivityId());
        dto.setSrId(entity.getSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setActivityDoneBy(entity.getActivityDoneBy());
        dto.setInternalEngineerId(entity.getInternalEngineerId());
        dto.setInternalEngineerName(entity.getInternalEngineerName());
        dto.setExternalEngineerName(entity.getExternalEngineerName());
        dto.setExternalEngineerContactNo(entity.getExternalEngineerContactNo());
        dto.setExternalEngineerEmailId(entity.getExternalEngineerEmailId());
        dto.setServiceProvidedBy(entity.getServiceProvidedBy());
        dto.setServiceProvidedById(entity.getServiceProvidedById());
        dto.setServiceProvidedByName(entity.getServiceProvidedByName());
        dto.setActivityDt(entity.getActivityDt());
        dto.setActivityStartDt(entity.getActivityStartDt());
        dto.setActivityEndDt(entity.getActivityEndDt());
        dto.setActivityStartTime(entity.getActivityStartTime());
        dto.setActivityEndTime(entity.getActivityEndTime());
        dto.setTotalHrs(entity.getTotalHrs());
        dto.setActivityDone(entity.getActivityDone());
        dto.setInternalEngineerRemarks(entity.getInternalEngineerRemarks());
        dto.setExternalEngineerRemarks(entity.getExternalEngineerRemarks());
        dto.setInternalEngineerCost(entity.getInternalEngineerCost());
        dto.setHoldFlag(entity.getHoldFlag());
        dto.setHoldStartDt(entity.getHoldStartDt());
        dto.setHoldEndDt(entity.getHoldEndDt());
        dto.setHoldStartTime(entity.getHoldStartTime());
        dto.setHoldEndTime(entity.getHoldEndTime());
        dto.setCalibrationRemarks(entity.getCalibrationRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPhysicalDamage(entity.getPhysicalDamage());
        dto.setPhysicalDamageDescription(entity.getPhysicalDamageDescription());
        dto.setFindings(entity.getFindings());
        dto.setFindingsDescription(entity.getFindingsDescription());
        dto.setCorrectiveActions(entity.getCorrectiveActions());
        dto.setPatientSafety(entity.getPatientSafety());
        dto.setPatientSafetyDescription(entity.getPatientSafetyDescription());
        dto.setEfs(entity.getEfs());
        dto.setEfsId(entity.getEfsId());
        dto.setActivityStatusFlag(entity.getActivityStatusFlag());
        return dto;
    }
}