package com.sams.service.impl;

import com.sams.dto.ServiceRequestDTO;
import com.sams.entity.ServiceRequest;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ServiceRequestRepository;
import com.sams.service.ServiceRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceRequestServiceImpl implements ServiceRequestService {

    private final ServiceRequestRepository repository;

    @Override
    @Transactional
    public ServiceRequestDTO create(ServiceRequestDTO dto) {
        ServiceRequest entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ServiceRequestDTO getById(Long id) {
        ServiceRequest entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceRequest not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ServiceRequestDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServiceRequestDTO update(Long id, ServiceRequestDTO dto) {
        ServiceRequest entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceRequest not found with ID: " + id));
        ServiceRequest mapped = mapToEntity(dto);
        mapped.setSrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ServiceRequest entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceRequest not found with ID: " + id));
        repository.delete(entity);
    }

    private ServiceRequest mapToEntity(ServiceRequestDTO dto) {
        ServiceRequest entity = new ServiceRequest();
        entity.setSrId(dto.getSrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setParentSrId(dto.getParentSrId());
        entity.setIsParent(dto.getIsParent());
        entity.setSubTicketFor(dto.getSubTicketFor());
        entity.setAssetId(dto.getAssetId());
        entity.setAssetCode(dto.getAssetCode());
        entity.setDescription(dto.getDescription());
        entity.setAssetSerialNo(dto.getAssetSerialNo());
        entity.setDepartmentId(dto.getDepartmentId());
        entity.setDepartmentName(dto.getDepartmentName());
        entity.setModelId(dto.getModelId());
        entity.setModelName(dto.getModelName());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setManufacturerName(dto.getManufacturerName());
        entity.setAssetTypeId(dto.getAssetTypeId());
        entity.setAssetTypeName(dto.getAssetTypeName());
        entity.setAssetCategoryId(dto.getAssetCategoryId());
        entity.setAssetCategoryName(dto.getAssetCategoryName());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setAssetSubCategoryName(dto.getAssetSubCategoryName());
        entity.setAssetGroupId(dto.getAssetGroupId());
        entity.setAssetGroupName(dto.getAssetGroupName());
        entity.setAssetGroupDesc(dto.getAssetGroupDesc());
        entity.setAssetStatusId(dto.getAssetStatusId());
        entity.setFunctionality(dto.getFunctionality());
        entity.setMaintenanceType(dto.getMaintenanceType());
        entity.setSubDepartment(dto.getSubDepartment());
        entity.setSubDepartmentId(dto.getSubDepartmentId());
        entity.setRoomName(dto.getRoomName());
        entity.setFloorName(dto.getFloorName());
        entity.setSegmentName(dto.getSegmentName());
        entity.setBlockName(dto.getBlockName());
        entity.setPriority(dto.getPriority());
        entity.setRisk(dto.getRisk());
        entity.setExpectedInstallationDt(dto.getExpectedInstallationDt());
        entity.setActualInstalledDt(dto.getActualInstalledDt());
        entity.setInstallationType(dto.getInstallationType());
        entity.setInstallationRemarks(dto.getInstallationRemarks());
        entity.setInstallationDoneBy(dto.getInstallationDoneBy());
        entity.setInsInternalEngineerId(dto.getInsInternalEngineerId());
        entity.setInsInternalEngineerName(dto.getInsInternalEngineerName());
        entity.setInstallationProvidedBy(dto.getInstallationProvidedBy());
        entity.setInstallationProvidedById(dto.getInstallationProvidedById());
        entity.setInstallationProvidedByName(dto.getInstallationProvidedByName());
        entity.setInsExternalEngineerName(dto.getInsExternalEngineerName());
        entity.setInsExtEngineerContactNo(dto.getInsExtEngineerContactNo());
        entity.setInsExtEngineerEmailId(dto.getInsExtEngineerEmailId());
        entity.setSrNo(dto.getSrNo());
        entity.setSrType(dto.getSrType());
        entity.setSrPriority(dto.getSrPriority());
        entity.setSrSeverity(dto.getSrSeverity());
        entity.setSrStatusId(dto.getSrStatusId());
        entity.setSrRemarks(dto.getSrRemarks());
        entity.setAttribute3Name(dto.getAttribute3Name());
        entity.setAttribute4Name(dto.getAttribute4Name());
        entity.setAttribute5Name(dto.getAttribute5Name());
        entity.setCallerName(dto.getCallerName());
        entity.setCallerContactNo(dto.getCallerContactNo());
        entity.setProblemReported(dto.getProblemReported());
        entity.setProblemObserved(dto.getProblemObserved());
        entity.setActionTaken(dto.getActionTaken());
        entity.setProblemAnalysisImage(dto.getProblemAnalysisImage());
        entity.setSrOpenDt(dto.getSrOpenDt());
        entity.setSrAckDt(dto.getSrAckDt());
        entity.setWorkStartEstArrTime(dto.getWorkStartEstArrTime());
        entity.setSrWorkStartDt(dto.getSrWorkStartDt());
        entity.setSrCompletedDt(dto.getSrCompletedDt());
        entity.setSrClosedDt(dto.getSrClosedDt());
        entity.setAckByUserId(dto.getAckByUserId());
        entity.setWorkStartedByUserId(dto.getWorkStartedByUserId());
        entity.setCompletedByUserId(dto.getCompletedByUserId());
        entity.setClosedByUserId(dto.getClosedByUserId());
        entity.setTotalDownHrs(dto.getTotalDownHrs());
        entity.setCancelledBy(dto.getCancelledBy());
        entity.setCancelledDt(dto.getCancelledDt());
        entity.setAssignedTo(dto.getAssignedTo());
        entity.setAssignedToId(dto.getAssignedToId());
        entity.setAssignedDt(dto.getAssignedDt());
        entity.setAssignedBy(dto.getAssignedBy());
        entity.setAssignedToContactNo(dto.getAssignedToContactNo());
        entity.setReAssignedFrom(dto.getReAssignedFrom());
        entity.setReAssignedFromId(dto.getReAssignedFromId());
        entity.setReAssignedDt(dto.getReAssignedDt());
        entity.setReAssignedBy(dto.getReAssignedBy());
        entity.setReassignedStatus(dto.getReassignedStatus());
        entity.setReassignedRemarks(dto.getReassignedRemarks());
        entity.setSchdDtlId(dto.getSchdDtlId());
        entity.setSchdNameRef(dto.getSchdNameRef());
        entity.setSrCreateImages(dto.getSrCreateImages());
        entity.setSrCompletedImages(dto.getSrCompletedImages());
        entity.setSrClosedBySignature(dto.getSrClosedBySignature());
        entity.setClosedByComments(dto.getClosedByComments());
        entity.setClosedByRating(dto.getClosedByRating());
        entity.setClosedByName(dto.getClosedByName());
        entity.setCloseVerificationOtp(dto.getCloseVerificationOtp());
        entity.setContractId(dto.getContractId());
        entity.setContractNo(dto.getContractNo());
        entity.setCoverageType(dto.getCoverageType());
        entity.setContractType(dto.getContractType());
        entity.setAssetPartiallyWorking(dto.getAssetPartiallyWorking());
        entity.setSrHold(dto.getSrHold());
        entity.setPartiallyWorkingReason(dto.getPartiallyWorkingReason());
        entity.setIncidentDescription(dto.getIncidentDescription());
        entity.setAssetRetireId(dto.getAssetRetireId());
        entity.setHandoverCompleted(dto.getHandoverCompleted());
        entity.setHandoverCompletedDt(dto.getHandoverCompletedDt());
        entity.setCloseRemarks(dto.getCloseRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setMaintenanceStrategy(dto.getMaintenanceStrategy());
        entity.setPmMaintenanceStrategy(dto.getPmMaintenanceStrategy());
        entity.setPaMaintenanceStrategy(dto.getPaMaintenanceStrategy());
        entity.setQaMaintenanceStrategy(dto.getQaMaintenanceStrategy());
        entity.setPhysicalDamageDescription(dto.getPhysicalDamageDescription());
        entity.setEfs(dto.getEfs());
        entity.setEfsId(dto.getEfsId());
        entity.setIncidentPhysicalDamage(dto.getIncidentPhysicalDamage());
        entity.setPhysicalDamage(dto.getPhysicalDamage());
        entity.setSrAckCoordinates(dto.getSrAckCoordinates());
        entity.setSrAckAddress(dto.getSrAckAddress());
        entity.setSrPhysicalDamageCoordinates(dto.getSrPhysicalDamageCoordinates());
        entity.setSrPhysicalDamageAddress(dto.getSrPhysicalDamageAddress());
        entity.setSrCompleteCoordinates(dto.getSrCompleteCoordinates());
        entity.setSrCompleteAddress(dto.getSrCompleteAddress());
        entity.setSrCloseCoordinates(dto.getSrCloseCoordinates());
        entity.setSrCloseAddress(dto.getSrCloseAddress());
        entity.setSrFeedbackCallerSign(dto.getSrFeedbackCallerSign());
        entity.setSrFeedback(dto.getSrFeedback());
        entity.setSrFeedbackCallerRemarks(dto.getSrFeedbackCallerRemarks());
        entity.setEfsSoftDate(dto.getEfsSoftDate());
        return entity;
    }

    private ServiceRequestDTO mapToDTO(ServiceRequest entity) {
        ServiceRequestDTO dto = new ServiceRequestDTO();
        dto.setSrId(entity.getSrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setParentSrId(entity.getParentSrId());
        dto.setIsParent(entity.getIsParent());
        dto.setSubTicketFor(entity.getSubTicketFor());
        dto.setAssetId(entity.getAssetId());
        dto.setAssetCode(entity.getAssetCode());
        dto.setDescription(entity.getDescription());
        dto.setAssetSerialNo(entity.getAssetSerialNo());
        dto.setDepartmentId(entity.getDepartmentId());
        dto.setDepartmentName(entity.getDepartmentName());
        dto.setModelId(entity.getModelId());
        dto.setModelName(entity.getModelName());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setManufacturerName(entity.getManufacturerName());
        dto.setAssetTypeId(entity.getAssetTypeId());
        dto.setAssetTypeName(entity.getAssetTypeName());
        dto.setAssetCategoryId(entity.getAssetCategoryId());
        dto.setAssetCategoryName(entity.getAssetCategoryName());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setAssetSubCategoryName(entity.getAssetSubCategoryName());
        dto.setAssetGroupId(entity.getAssetGroupId());
        dto.setAssetGroupName(entity.getAssetGroupName());
        dto.setAssetGroupDesc(entity.getAssetGroupDesc());
        dto.setAssetStatusId(entity.getAssetStatusId());
        dto.setFunctionality(entity.getFunctionality());
        dto.setMaintenanceType(entity.getMaintenanceType());
        dto.setSubDepartment(entity.getSubDepartment());
        dto.setSubDepartmentId(entity.getSubDepartmentId());
        dto.setRoomName(entity.getRoomName());
        dto.setFloorName(entity.getFloorName());
        dto.setSegmentName(entity.getSegmentName());
        dto.setBlockName(entity.getBlockName());
        dto.setPriority(entity.getPriority());
        dto.setRisk(entity.getRisk());
        dto.setExpectedInstallationDt(entity.getExpectedInstallationDt());
        dto.setActualInstalledDt(entity.getActualInstalledDt());
        dto.setInstallationType(entity.getInstallationType());
        dto.setInstallationRemarks(entity.getInstallationRemarks());
        dto.setInstallationDoneBy(entity.getInstallationDoneBy());
        dto.setInsInternalEngineerId(entity.getInsInternalEngineerId());
        dto.setInsInternalEngineerName(entity.getInsInternalEngineerName());
        dto.setInstallationProvidedBy(entity.getInstallationProvidedBy());
        dto.setInstallationProvidedById(entity.getInstallationProvidedById());
        dto.setInstallationProvidedByName(entity.getInstallationProvidedByName());
        dto.setInsExternalEngineerName(entity.getInsExternalEngineerName());
        dto.setInsExtEngineerContactNo(entity.getInsExtEngineerContactNo());
        dto.setInsExtEngineerEmailId(entity.getInsExtEngineerEmailId());
        dto.setSrNo(entity.getSrNo());
        dto.setSrType(entity.getSrType());
        dto.setSrPriority(entity.getSrPriority());
        dto.setSrSeverity(entity.getSrSeverity());
        dto.setSrStatusId(entity.getSrStatusId());
        dto.setSrRemarks(entity.getSrRemarks());
        dto.setAttribute3Name(entity.getAttribute3Name());
        dto.setAttribute4Name(entity.getAttribute4Name());
        dto.setAttribute5Name(entity.getAttribute5Name());
        dto.setCallerName(entity.getCallerName());
        dto.setCallerContactNo(entity.getCallerContactNo());
        dto.setProblemReported(entity.getProblemReported());
        dto.setProblemObserved(entity.getProblemObserved());
        dto.setActionTaken(entity.getActionTaken());
        dto.setProblemAnalysisImage(entity.getProblemAnalysisImage());
        dto.setSrOpenDt(entity.getSrOpenDt());
        dto.setSrAckDt(entity.getSrAckDt());
        dto.setWorkStartEstArrTime(entity.getWorkStartEstArrTime());
        dto.setSrWorkStartDt(entity.getSrWorkStartDt());
        dto.setSrCompletedDt(entity.getSrCompletedDt());
        dto.setSrClosedDt(entity.getSrClosedDt());
        dto.setAckByUserId(entity.getAckByUserId());
        dto.setWorkStartedByUserId(entity.getWorkStartedByUserId());
        dto.setCompletedByUserId(entity.getCompletedByUserId());
        dto.setClosedByUserId(entity.getClosedByUserId());
        dto.setTotalDownHrs(entity.getTotalDownHrs());
        dto.setCancelledBy(entity.getCancelledBy());
        dto.setCancelledDt(entity.getCancelledDt());
        dto.setAssignedTo(entity.getAssignedTo());
        dto.setAssignedToId(entity.getAssignedToId());
        dto.setAssignedDt(entity.getAssignedDt());
        dto.setAssignedBy(entity.getAssignedBy());
        dto.setAssignedToContactNo(entity.getAssignedToContactNo());
        dto.setReAssignedFrom(entity.getReAssignedFrom());
        dto.setReAssignedFromId(entity.getReAssignedFromId());
        dto.setReAssignedDt(entity.getReAssignedDt());
        dto.setReAssignedBy(entity.getReAssignedBy());
        dto.setReassignedStatus(entity.getReassignedStatus());
        dto.setReassignedRemarks(entity.getReassignedRemarks());
        dto.setSchdDtlId(entity.getSchdDtlId());
        dto.setSchdNameRef(entity.getSchdNameRef());
        dto.setSrCreateImages(entity.getSrCreateImages());
        dto.setSrCompletedImages(entity.getSrCompletedImages());
        dto.setSrClosedBySignature(entity.getSrClosedBySignature());
        dto.setClosedByComments(entity.getClosedByComments());
        dto.setClosedByRating(entity.getClosedByRating());
        dto.setClosedByName(entity.getClosedByName());
        dto.setCloseVerificationOtp(entity.getCloseVerificationOtp());
        dto.setContractId(entity.getContractId());
        dto.setContractNo(entity.getContractNo());
        dto.setCoverageType(entity.getCoverageType());
        dto.setContractType(entity.getContractType());
        dto.setAssetPartiallyWorking(entity.getAssetPartiallyWorking());
        dto.setSrHold(entity.getSrHold());
        dto.setPartiallyWorkingReason(entity.getPartiallyWorkingReason());
        dto.setIncidentDescription(entity.getIncidentDescription());
        dto.setAssetRetireId(entity.getAssetRetireId());
        dto.setHandoverCompleted(entity.getHandoverCompleted());
        dto.setHandoverCompletedDt(entity.getHandoverCompletedDt());
        dto.setCloseRemarks(entity.getCloseRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setMaintenanceStrategy(entity.getMaintenanceStrategy());
        dto.setPmMaintenanceStrategy(entity.getPmMaintenanceStrategy());
        dto.setPaMaintenanceStrategy(entity.getPaMaintenanceStrategy());
        dto.setQaMaintenanceStrategy(entity.getQaMaintenanceStrategy());
        dto.setPhysicalDamageDescription(entity.getPhysicalDamageDescription());
        dto.setEfs(entity.getEfs());
        dto.setEfsId(entity.getEfsId());
        dto.setIncidentPhysicalDamage(entity.getIncidentPhysicalDamage());
        dto.setPhysicalDamage(entity.getPhysicalDamage());
        dto.setSrAckCoordinates(entity.getSrAckCoordinates());
        dto.setSrAckAddress(entity.getSrAckAddress());
        dto.setSrPhysicalDamageCoordinates(entity.getSrPhysicalDamageCoordinates());
        dto.setSrPhysicalDamageAddress(entity.getSrPhysicalDamageAddress());
        dto.setSrCompleteCoordinates(entity.getSrCompleteCoordinates());
        dto.setSrCompleteAddress(entity.getSrCompleteAddress());
        dto.setSrCloseCoordinates(entity.getSrCloseCoordinates());
        dto.setSrCloseAddress(entity.getSrCloseAddress());
        dto.setSrFeedbackCallerSign(entity.getSrFeedbackCallerSign());
        dto.setSrFeedback(entity.getSrFeedback());
        dto.setSrFeedbackCallerRemarks(entity.getSrFeedbackCallerRemarks());
        dto.setEfsSoftDate(entity.getEfsSoftDate());
        return dto;
    }
}