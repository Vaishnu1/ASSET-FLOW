package com.sams.service.impl;

import com.sams.dto.TaxDTO;
import com.sams.entity.Tax;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.TaxRepository;
import com.sams.service.TaxService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaxServiceImpl implements TaxService {

    private final TaxRepository repository;

    @Override
    @Transactional
    public TaxDTO create(TaxDTO dto) {
        Tax entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public TaxDTO getById(Long id) {
        Tax entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tax not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<TaxDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public TaxDTO update(Long id, TaxDTO dto) {
        Tax entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tax not found with ID: " + id));
        Tax mapped = mapToEntity(dto);
        mapped.setTaxId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Tax entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tax not found with ID: " + id));
        repository.delete(entity);
    }

    private Tax mapToEntity(TaxDTO dto) {
        Tax entity = new Tax();
        entity.setTaxId(dto.getTaxId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setTaxCode(dto.getTaxCode());
        entity.setTaxRate(dto.getTaxRate());
        entity.setTaxDesc(dto.getTaxDesc());
        entity.setTaxComputation(dto.getTaxComputation());
        entity.setActive(dto.getActive());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private TaxDTO mapToDTO(Tax entity) {
        TaxDTO dto = new TaxDTO();
        dto.setTaxId(entity.getTaxId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setTaxCode(entity.getTaxCode());
        dto.setTaxRate(entity.getTaxRate());
        dto.setTaxDesc(entity.getTaxDesc());
        dto.setTaxComputation(entity.getTaxComputation());
        dto.setActive(entity.getActive());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}