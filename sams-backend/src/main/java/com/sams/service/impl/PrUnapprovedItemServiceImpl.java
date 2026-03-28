package com.sams.service.impl;

import com.sams.dto.PrUnapprovedItemDTO;
import com.sams.entity.PrUnapprovedItem;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrUnapprovedItemRepository;
import com.sams.service.PrUnapprovedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrUnapprovedItemServiceImpl implements PrUnapprovedItemService {

    private final PrUnapprovedItemRepository repository;

    @Override
    @Transactional
    public PrUnapprovedItemDTO create(PrUnapprovedItemDTO dto) {
        PrUnapprovedItem entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrUnapprovedItemDTO getById(Long id) {
        PrUnapprovedItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrUnapprovedItem not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrUnapprovedItemDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrUnapprovedItemDTO update(Long id, PrUnapprovedItemDTO dto) {
        PrUnapprovedItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrUnapprovedItem not found with ID: " + id));
        PrUnapprovedItem mapped = mapToEntity(dto);
        mapped.setUnapprovedItemId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrUnapprovedItem entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrUnapprovedItem not found with ID: " + id));
        repository.delete(entity);
    }

    private PrUnapprovedItem mapToEntity(PrUnapprovedItemDTO dto) {
        PrUnapprovedItem entity = new PrUnapprovedItem();
        entity.setUnapprovedItemId(dto.getUnapprovedItemId());
        entity.setPrId(dto.getPrId());
        entity.setPrDtlId(dto.getPrDtlId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setUnapprovedItemName(dto.getUnapprovedItemName());
        entity.setUnapprovedItemDesc(dto.getUnapprovedItemDesc());
        entity.setUnapprovedUomCd(dto.getUnapprovedUomCd());
        entity.setItemPushedToOrg(dto.getItemPushedToOrg());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrUnapprovedItemDTO mapToDTO(PrUnapprovedItem entity) {
        PrUnapprovedItemDTO dto = new PrUnapprovedItemDTO();
        dto.setUnapprovedItemId(entity.getUnapprovedItemId());
        dto.setPrId(entity.getPrId());
        dto.setPrDtlId(entity.getPrDtlId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setUnapprovedItemName(entity.getUnapprovedItemName());
        dto.setUnapprovedItemDesc(entity.getUnapprovedItemDesc());
        dto.setUnapprovedUomCd(entity.getUnapprovedUomCd());
        dto.setItemPushedToOrg(entity.getItemPushedToOrg());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}