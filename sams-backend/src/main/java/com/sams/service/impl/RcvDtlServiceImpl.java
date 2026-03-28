package com.sams.service.impl;

import com.sams.dto.RcvDtlDTO;
import com.sams.entity.RcvDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RcvDtlRepository;
import com.sams.service.RcvDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcvDtlServiceImpl implements RcvDtlService {

    private final RcvDtlRepository repository;

    @Override
    @Transactional
    public RcvDtlDTO create(RcvDtlDTO dto) {
        RcvDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RcvDtlDTO getById(Long id) {
        RcvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RcvDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RcvDtlDTO update(Long id, RcvDtlDTO dto) {
        RcvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtl not found with ID: " + id));
        RcvDtl mapped = mapToEntity(dto);
        mapped.setRcvDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RcvDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private RcvDtl mapToEntity(RcvDtlDTO dto) {
        RcvDtl entity = new RcvDtl();
        entity.setRcvDtlId(dto.getRcvDtlId());
        entity.setRcvHdrId(dto.getRcvHdrId());
        entity.setRcvLineNo(dto.getRcvLineNo());
        entity.setSuppCd(dto.getSuppCd());
        entity.setPoId(dto.getPoId());
        entity.setPoNo(dto.getPoNo());
        entity.setPoLineId(dto.getPoLineId());
        entity.setPoLineNo(dto.getPoLineNo());
        entity.setRequisitionId(dto.getRequisitionId());
        entity.setRequisitionNo(dto.getRequisitionNo());
        entity.setRequisitionLineId(dto.getRequisitionLineId());
        entity.setRequisitionLineNo(dto.getRequisitionLineNo());
        entity.setRefNo(dto.getRefNo());
        entity.setItemId(dto.getItemId());
        entity.setUomCd(dto.getUomCd());
        entity.setItemCd(dto.getItemCd());
        entity.setLotControlFlag(dto.getLotControlFlag());
        entity.setUnitPrice(dto.getUnitPrice());
        entity.setTransferCost(dto.getTransferCost());
        entity.setTransportationCost(dto.getTransportationCost());
        entity.setDropShip(dto.getDropShip());
        entity.setRcvQty(dto.getRcvQty());
        entity.setOldRcvQty(dto.getOldRcvQty());
        entity.setAcceptQty(dto.getAcceptQty());
        entity.setOldAcceptQty(dto.getOldAcceptQty());
        entity.setRejectQty(dto.getRejectQty());
        entity.setOldRejectQty(dto.getOldRejectQty());
        entity.setRejectReasonId(dto.getRejectReasonId());
        entity.setPoQty(dto.getPoQty());
        entity.setPoBalQty(dto.getPoBalQty());
        entity.setReqDt(dto.getReqDt());
        entity.setInvStatus(dto.getInvStatus());
        entity.setWhId(dto.getWhId());
        entity.setWhCd(dto.getWhCd());
        entity.setSupplierLotNo(dto.getSupplierLotNo());
        entity.setLocatorId(dto.getLocatorId());
        entity.setLocatorCd(dto.getLocatorCd());
        entity.setComments(dto.getComments());
        entity.setCountryOfOriginCd(dto.getCountryOfOriginCd());
        entity.setBarCodeLabel(dto.getBarCodeLabel());
        entity.setProjectCode(dto.getProjectCode());
        entity.setJobOrderId(dto.getJobOrderId());
        entity.setReplacement(dto.getReplacement());
        entity.setPoDtlId(dto.getPoDtlId());
        entity.setItemDesc(dto.getItemDesc());
        entity.setWoNumber(dto.getWoNumber());
        return entity;
    }

    private RcvDtlDTO mapToDTO(RcvDtl entity) {
        RcvDtlDTO dto = new RcvDtlDTO();
        dto.setRcvDtlId(entity.getRcvDtlId());
        dto.setRcvHdrId(entity.getRcvHdrId());
        dto.setRcvLineNo(entity.getRcvLineNo());
        dto.setSuppCd(entity.getSuppCd());
        dto.setPoId(entity.getPoId());
        dto.setPoNo(entity.getPoNo());
        dto.setPoLineId(entity.getPoLineId());
        dto.setPoLineNo(entity.getPoLineNo());
        dto.setRequisitionId(entity.getRequisitionId());
        dto.setRequisitionNo(entity.getRequisitionNo());
        dto.setRequisitionLineId(entity.getRequisitionLineId());
        dto.setRequisitionLineNo(entity.getRequisitionLineNo());
        dto.setRefNo(entity.getRefNo());
        dto.setItemId(entity.getItemId());
        dto.setUomCd(entity.getUomCd());
        dto.setItemCd(entity.getItemCd());
        dto.setLotControlFlag(entity.getLotControlFlag());
        dto.setUnitPrice(entity.getUnitPrice());
        dto.setTransferCost(entity.getTransferCost());
        dto.setTransportationCost(entity.getTransportationCost());
        dto.setDropShip(entity.getDropShip());
        dto.setRcvQty(entity.getRcvQty());
        dto.setOldRcvQty(entity.getOldRcvQty());
        dto.setAcceptQty(entity.getAcceptQty());
        dto.setOldAcceptQty(entity.getOldAcceptQty());
        dto.setRejectQty(entity.getRejectQty());
        dto.setOldRejectQty(entity.getOldRejectQty());
        dto.setRejectReasonId(entity.getRejectReasonId());
        dto.setPoQty(entity.getPoQty());
        dto.setPoBalQty(entity.getPoBalQty());
        dto.setReqDt(entity.getReqDt());
        dto.setInvStatus(entity.getInvStatus());
        dto.setWhId(entity.getWhId());
        dto.setWhCd(entity.getWhCd());
        dto.setSupplierLotNo(entity.getSupplierLotNo());
        dto.setLocatorId(entity.getLocatorId());
        dto.setLocatorCd(entity.getLocatorCd());
        dto.setComments(entity.getComments());
        dto.setCountryOfOriginCd(entity.getCountryOfOriginCd());
        dto.setBarCodeLabel(entity.getBarCodeLabel());
        dto.setProjectCode(entity.getProjectCode());
        dto.setJobOrderId(entity.getJobOrderId());
        dto.setReplacement(entity.getReplacement());
        dto.setPoDtlId(entity.getPoDtlId());
        dto.setItemDesc(entity.getItemDesc());
        dto.setWoNumber(entity.getWoNumber());
        return dto;
    }
}