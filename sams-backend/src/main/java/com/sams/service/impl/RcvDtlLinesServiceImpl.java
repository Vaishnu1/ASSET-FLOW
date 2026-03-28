package com.sams.service.impl;

import com.sams.dto.RcvDtlLinesDTO;
import com.sams.entity.RcvDtlLines;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RcvDtlLinesRepository;
import com.sams.service.RcvDtlLinesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcvDtlLinesServiceImpl implements RcvDtlLinesService {

    private final RcvDtlLinesRepository repository;

    @Override
    @Transactional
    public RcvDtlLinesDTO create(RcvDtlLinesDTO dto) {
        RcvDtlLines entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RcvDtlLinesDTO getById(Long id) {
        RcvDtlLines entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtlLines not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RcvDtlLinesDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RcvDtlLinesDTO update(Long id, RcvDtlLinesDTO dto) {
        RcvDtlLines entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtlLines not found with ID: " + id));
        RcvDtlLines mapped = mapToEntity(dto);
        mapped.setRcvDtlLineId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RcvDtlLines entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RcvDtlLines not found with ID: " + id));
        repository.delete(entity);
    }

    private RcvDtlLines mapToEntity(RcvDtlLinesDTO dto) {
        RcvDtlLines entity = new RcvDtlLines();
        entity.setRcvDtlLineId(dto.getRcvDtlLineId());
        entity.setRcvHdrId(dto.getRcvHdrId());
        entity.setRcvDtlId(dto.getRcvDtlId());
        entity.setWhId(dto.getWhId());
        entity.setWhCd(dto.getWhCd());
        entity.setItemId(dto.getItemId());
        entity.setItemCd(dto.getItemCd());
        entity.setLotNo(dto.getLotNo());
        entity.setSerialNo(dto.getSerialNo());
        entity.setQty(dto.getQty());
        entity.setOldQty(dto.getOldQty());
        entity.setLotExpiryDt(dto.getLotExpiryDt());
        entity.setLocatorId(dto.getLocatorId());
        entity.setLocatorCd(dto.getLocatorCd());
        entity.setStockStatus(dto.getStockStatus());
        entity.setInvStatus(dto.getInvStatus());
        entity.setRejectReasonId(dto.getRejectReasonId());
        entity.setComments(dto.getComments());
        entity.setSupplierLotNo(dto.getSupplierLotNo());
        entity.setSpec1(dto.getSpec1());
        entity.setSpec2(dto.getSpec2());
        entity.setSpec3(dto.getSpec3());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private RcvDtlLinesDTO mapToDTO(RcvDtlLines entity) {
        RcvDtlLinesDTO dto = new RcvDtlLinesDTO();
        dto.setRcvDtlLineId(entity.getRcvDtlLineId());
        dto.setRcvHdrId(entity.getRcvHdrId());
        dto.setRcvDtlId(entity.getRcvDtlId());
        dto.setWhId(entity.getWhId());
        dto.setWhCd(entity.getWhCd());
        dto.setItemId(entity.getItemId());
        dto.setItemCd(entity.getItemCd());
        dto.setLotNo(entity.getLotNo());
        dto.setSerialNo(entity.getSerialNo());
        dto.setQty(entity.getQty());
        dto.setOldQty(entity.getOldQty());
        dto.setLotExpiryDt(entity.getLotExpiryDt());
        dto.setLocatorId(entity.getLocatorId());
        dto.setLocatorCd(entity.getLocatorCd());
        dto.setStockStatus(entity.getStockStatus());
        dto.setInvStatus(entity.getInvStatus());
        dto.setRejectReasonId(entity.getRejectReasonId());
        dto.setComments(entity.getComments());
        dto.setSupplierLotNo(entity.getSupplierLotNo());
        dto.setSpec1(entity.getSpec1());
        dto.setSpec2(entity.getSpec2());
        dto.setSpec3(entity.getSpec3());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}