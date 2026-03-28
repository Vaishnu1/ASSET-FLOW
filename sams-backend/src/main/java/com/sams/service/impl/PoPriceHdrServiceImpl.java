package com.sams.service.impl;

import com.sams.dto.PoPriceHdrDTO;
import com.sams.entity.PoPriceHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PoPriceHdrRepository;
import com.sams.service.PoPriceHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PoPriceHdrServiceImpl implements PoPriceHdrService {

    private final PoPriceHdrRepository repository;

    @Override
    @Transactional
    public PoPriceHdrDTO create(PoPriceHdrDTO dto) {
        PoPriceHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PoPriceHdrDTO getById(Long id) {
        PoPriceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PoPriceHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PoPriceHdrDTO update(Long id, PoPriceHdrDTO dto) {
        PoPriceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceHdr not found with ID: " + id));
        PoPriceHdr mapped = mapToEntity(dto);
        mapped.setPoPriceHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PoPriceHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PoPriceHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private PoPriceHdr mapToEntity(PoPriceHdrDTO dto) {
        PoPriceHdr entity = new PoPriceHdr();
        entity.setPoPriceHdrId(dto.getPoPriceHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setPoPriceName(dto.getPoPriceName());
        entity.setPoPriceDesc(dto.getPoPriceDesc());
        entity.setCurCd(dto.getCurCd());
        entity.setEffcFromDt(dto.getEffcFromDt());
        entity.setEffcToDt(dto.getEffcToDt());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PoPriceHdrDTO mapToDTO(PoPriceHdr entity) {
        PoPriceHdrDTO dto = new PoPriceHdrDTO();
        dto.setPoPriceHdrId(entity.getPoPriceHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setPoPriceName(entity.getPoPriceName());
        dto.setPoPriceDesc(entity.getPoPriceDesc());
        dto.setCurCd(entity.getCurCd());
        dto.setEffcFromDt(entity.getEffcFromDt());
        dto.setEffcToDt(entity.getEffcToDt());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}