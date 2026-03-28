package com.sams.service.impl;

import com.sams.dto.RcvHdrDTO;
import com.sams.entity.RcvHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RcvHdrRepository;
import com.sams.service.RcvHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcvHdrServiceImpl implements RcvHdrService {

    private final RcvHdrRepository repository;

    @Override
    @Transactional
    public RcvHdrDTO create(RcvHdrDTO dto) {
        RcvHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RcvHdrDTO getById(Long id) {
        RcvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RcvHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RcvHdrDTO update(Long id, RcvHdrDTO dto) {
        RcvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvHdr not found with ID: " + id));
        RcvHdr mapped = mapToEntity(dto);
        mapped.setRcvHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RcvHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private RcvHdr mapToEntity(RcvHdrDTO dto) {
        RcvHdr entity = new RcvHdr();
        entity.setRcvHdrId(dto.getRcvHdrId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setCaNo(dto.getCaNo());
        entity.setRcvDt(dto.getRcvDt());
        entity.setReceiptNo(dto.getReceiptNo());
        entity.setReceiptDt(dto.getReceiptDt());
        entity.setRcvSource(dto.getRcvSource());
        entity.setOrderType(dto.getOrderType());
        entity.setSuppId(dto.getSuppId());
        entity.setSuppCd(dto.getSuppCd());
        entity.setSuppName(dto.getSuppName());
        entity.setSuppWhId(dto.getSuppWhId());
        entity.setSuppWhCd(dto.getSuppWhCd());
        entity.setCustId(dto.getCustId());
        entity.setCustCd(dto.getCustCd());
        entity.setCustName(dto.getCustName());
        entity.setRequisitionNo(dto.getRequisitionNo());
        entity.setRmaNo(dto.getRmaNo());
        entity.setWaybillNo(dto.getWaybillNo());
        entity.setVehicleCarrierNo(dto.getVehicleCarrierNo());
        entity.setTransporterName(dto.getTransporterName());
        entity.setReceivedBy(dto.getReceivedBy());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setPoNo(dto.getPoNo());
        entity.setPartGroup(dto.getPartGroup());
        entity.setTypeOfConsignment(dto.getTypeOfConsignment());
        entity.setServiceReqNo(dto.getServiceReqNo());
        entity.setCheckedBy(dto.getCheckedBy());
        entity.setEmpCdNo(dto.getEmpCdNo());
        entity.setIssuedTo(dto.getIssuedTo());
        entity.setInchargeName(dto.getInchargeName());
        entity.setInvoice(dto.getInvoice());
        entity.setTransactionNo(dto.getTransactionNo());
        entity.setReplacement(dto.getReplacement());
        entity.setDepName(dto.getDepName());
        entity.setDepId(dto.getDepId());
        entity.setWoNumber(dto.getWoNumber());
        entity.setPoDate(dto.getPoDate());
        entity.setSupInvDate(dto.getSupInvDate());
        entity.setSupInvAmnt(dto.getSupInvAmnt());
        entity.setCeid(dto.getCeid());
        entity.setActive(dto.getActive());
        return entity;
    }

    private RcvHdrDTO mapToDTO(RcvHdr entity) {
        RcvHdrDTO dto = new RcvHdrDTO();
        dto.setRcvHdrId(entity.getRcvHdrId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setCaNo(entity.getCaNo());
        dto.setRcvDt(entity.getRcvDt());
        dto.setReceiptNo(entity.getReceiptNo());
        dto.setReceiptDt(entity.getReceiptDt());
        dto.setRcvSource(entity.getRcvSource());
        dto.setOrderType(entity.getOrderType());
        dto.setSuppId(entity.getSuppId());
        dto.setSuppCd(entity.getSuppCd());
        dto.setSuppName(entity.getSuppName());
        dto.setSuppWhId(entity.getSuppWhId());
        dto.setSuppWhCd(entity.getSuppWhCd());
        dto.setCustId(entity.getCustId());
        dto.setCustCd(entity.getCustCd());
        dto.setCustName(entity.getCustName());
        dto.setRequisitionNo(entity.getRequisitionNo());
        dto.setRmaNo(entity.getRmaNo());
        dto.setWaybillNo(entity.getWaybillNo());
        dto.setVehicleCarrierNo(entity.getVehicleCarrierNo());
        dto.setTransporterName(entity.getTransporterName());
        dto.setReceivedBy(entity.getReceivedBy());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setPoNo(entity.getPoNo());
        dto.setPartGroup(entity.getPartGroup());
        dto.setTypeOfConsignment(entity.getTypeOfConsignment());
        dto.setServiceReqNo(entity.getServiceReqNo());
        dto.setCheckedBy(entity.getCheckedBy());
        dto.setEmpCdNo(entity.getEmpCdNo());
        dto.setIssuedTo(entity.getIssuedTo());
        dto.setInchargeName(entity.getInchargeName());
        dto.setInvoice(entity.getInvoice());
        dto.setTransactionNo(entity.getTransactionNo());
        dto.setReplacement(entity.getReplacement());
        dto.setDepName(entity.getDepName());
        dto.setDepId(entity.getDepId());
        dto.setWoNumber(entity.getWoNumber());
        dto.setPoDate(entity.getPoDate());
        dto.setSupInvDate(entity.getSupInvDate());
        dto.setSupInvAmnt(entity.getSupInvAmnt());
        dto.setCeid(entity.getCeid());
        dto.setActive(entity.getActive());
        return dto;
    }
}