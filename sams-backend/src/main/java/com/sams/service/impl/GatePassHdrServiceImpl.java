package com.sams.service.impl;

import com.sams.dto.GatePassHdrDTO;
import com.sams.entity.GatePassHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.GatePassHdrRepository;
import com.sams.service.GatePassHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GatePassHdrServiceImpl implements GatePassHdrService {

    private final GatePassHdrRepository repository;

    @Override
    @Transactional
    public GatePassHdrDTO create(GatePassHdrDTO dto) {
        GatePassHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public GatePassHdrDTO getById(Long id) {
        GatePassHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<GatePassHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public GatePassHdrDTO update(Long id, GatePassHdrDTO dto) {
        GatePassHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassHdr not found with ID: " + id));
        GatePassHdr mapped = mapToEntity(dto);
        mapped.setGatePassHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        GatePassHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("GatePassHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private GatePassHdr mapToEntity(GatePassHdrDTO dto) {
        GatePassHdr entity = new GatePassHdr();
        entity.setGatePassHdrId(dto.getGatePassHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setGatePassNo(dto.getGatePassNo());
        entity.setGatePassStatusId(dto.getGatePassStatusId());
        entity.setGatePassSource(dto.getGatePassSource());
        entity.setGatePassSourceId(dto.getGatePassSourceId());
        entity.setGatePassSourceNo(dto.getGatePassSourceNo());
        entity.setGatePassPurpose(dto.getGatePassPurpose());
        entity.setDeliveryTo(dto.getDeliveryTo());
        entity.setDeliveryToId(dto.getDeliveryToId());
        entity.setDeliveryToName(dto.getDeliveryToName());
        entity.setSiteServiceLocationId(dto.getSiteServiceLocationId());
        entity.setSiteServiceLocationName(dto.getSiteServiceLocationName());
        entity.setDeliveryToAddress1(dto.getDeliveryToAddress1());
        entity.setDeliveryToAddress2(dto.getDeliveryToAddress2());
        entity.setDeliveryToCity(dto.getDeliveryToCity());
        entity.setDeliveryToState(dto.getDeliveryToState());
        entity.setDeliveryToCountry(dto.getDeliveryToCountry());
        entity.setDeliveryToZipcode(dto.getDeliveryToZipcode());
        entity.setDeliveryTakenByPerson(dto.getDeliveryTakenByPerson());
        entity.setDeliveryTakenByContactNo(dto.getDeliveryTakenByContactNo());
        entity.setDeliveryTakenByEmailId(dto.getDeliveryTakenByEmailId());
        entity.setDeliveryMode(dto.getDeliveryMode());
        entity.setCancelledBy(dto.getCancelledBy());
        entity.setCancelledDt(dto.getCancelledDt());
        entity.setGatePassDt(dto.getGatePassDt());
        entity.setRemarks(dto.getRemarks());
        entity.setGeneratedBy(dto.getGeneratedBy());
        entity.setActive(dto.getActive());
        entity.setApprovedBy(dto.getApprovedBy());
        entity.setApprovedDt(dto.getApprovedDt());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private GatePassHdrDTO mapToDTO(GatePassHdr entity) {
        GatePassHdrDTO dto = new GatePassHdrDTO();
        dto.setGatePassHdrId(entity.getGatePassHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setGatePassNo(entity.getGatePassNo());
        dto.setGatePassStatusId(entity.getGatePassStatusId());
        dto.setGatePassSource(entity.getGatePassSource());
        dto.setGatePassSourceId(entity.getGatePassSourceId());
        dto.setGatePassSourceNo(entity.getGatePassSourceNo());
        dto.setGatePassPurpose(entity.getGatePassPurpose());
        dto.setDeliveryTo(entity.getDeliveryTo());
        dto.setDeliveryToId(entity.getDeliveryToId());
        dto.setDeliveryToName(entity.getDeliveryToName());
        dto.setSiteServiceLocationId(entity.getSiteServiceLocationId());
        dto.setSiteServiceLocationName(entity.getSiteServiceLocationName());
        dto.setDeliveryToAddress1(entity.getDeliveryToAddress1());
        dto.setDeliveryToAddress2(entity.getDeliveryToAddress2());
        dto.setDeliveryToCity(entity.getDeliveryToCity());
        dto.setDeliveryToState(entity.getDeliveryToState());
        dto.setDeliveryToCountry(entity.getDeliveryToCountry());
        dto.setDeliveryToZipcode(entity.getDeliveryToZipcode());
        dto.setDeliveryTakenByPerson(entity.getDeliveryTakenByPerson());
        dto.setDeliveryTakenByContactNo(entity.getDeliveryTakenByContactNo());
        dto.setDeliveryTakenByEmailId(entity.getDeliveryTakenByEmailId());
        dto.setDeliveryMode(entity.getDeliveryMode());
        dto.setCancelledBy(entity.getCancelledBy());
        dto.setCancelledDt(entity.getCancelledDt());
        dto.setGatePassDt(entity.getGatePassDt());
        dto.setRemarks(entity.getRemarks());
        dto.setGeneratedBy(entity.getGeneratedBy());
        dto.setActive(entity.getActive());
        dto.setApprovedBy(entity.getApprovedBy());
        dto.setApprovedDt(entity.getApprovedDt());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}