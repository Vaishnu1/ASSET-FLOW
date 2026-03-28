package com.sams.service.impl;

import com.sams.dto.PurchaseTcTemplateHdrDTO;
import com.sams.entity.PurchaseTcTemplateHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchaseTcTemplateHdrRepository;
import com.sams.service.PurchaseTcTemplateHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseTcTemplateHdrServiceImpl implements PurchaseTcTemplateHdrService {

    private final PurchaseTcTemplateHdrRepository repository;

    @Override
    @Transactional
    public PurchaseTcTemplateHdrDTO create(PurchaseTcTemplateHdrDTO dto) {
        PurchaseTcTemplateHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchaseTcTemplateHdrDTO getById(Long id) {
        PurchaseTcTemplateHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchaseTcTemplateHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseTcTemplateHdrDTO update(Long id, PurchaseTcTemplateHdrDTO dto) {
        PurchaseTcTemplateHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateHdr not found with ID: " + id));
        PurchaseTcTemplateHdr mapped = mapToEntity(dto);
        mapped.setTcTemplateHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchaseTcTemplateHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcTemplateHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchaseTcTemplateHdr mapToEntity(PurchaseTcTemplateHdrDTO dto) {
        PurchaseTcTemplateHdr entity = new PurchaseTcTemplateHdr();
        entity.setTcTemplateHdrId(dto.getTcTemplateHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setProcessName(dto.getProcessName());
        entity.setTemplateName(dto.getTemplateName());
        entity.setActive(dto.getActive());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PurchaseTcTemplateHdrDTO mapToDTO(PurchaseTcTemplateHdr entity) {
        PurchaseTcTemplateHdrDTO dto = new PurchaseTcTemplateHdrDTO();
        dto.setTcTemplateHdrId(entity.getTcTemplateHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setProcessName(entity.getProcessName());
        dto.setTemplateName(entity.getTemplateName());
        dto.setActive(entity.getActive());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}