package com.sams.service.impl;

import com.sams.dto.CurrencyCodeDTO;
import com.sams.entity.CurrencyCode;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CurrencyCodeRepository;
import com.sams.service.CurrencyCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CurrencyCodeServiceImpl implements CurrencyCodeService {

    private final CurrencyCodeRepository repository;

    @Override
    @Transactional
    public CurrencyCodeDTO create(CurrencyCodeDTO dto) {
        CurrencyCode entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CurrencyCodeDTO getById(Long id) {
        CurrencyCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CurrencyCode not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CurrencyCodeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CurrencyCodeDTO update(Long id, CurrencyCodeDTO dto) {
        CurrencyCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CurrencyCode not found with ID: " + id));
        CurrencyCode mapped = mapToEntity(dto);
        mapped.setCurId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        CurrencyCode entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("CurrencyCode not found with ID: " + id));
        repository.delete(entity);
    }

    private CurrencyCode mapToEntity(CurrencyCodeDTO dto) {
        CurrencyCode entity = new CurrencyCode();
        entity.setCurId(dto.getCurId());
        entity.setOrgId(dto.getOrgId());
        entity.setCurCd(dto.getCurCd());
        entity.setCurName(dto.getCurName());
        entity.setCountryName(dto.getCountryName());
        entity.setCurrencyFormat(dto.getCurrencyFormat());
        entity.setRemarks(dto.getRemarks());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CurrencyCodeDTO mapToDTO(CurrencyCode entity) {
        CurrencyCodeDTO dto = new CurrencyCodeDTO();
        dto.setCurId(entity.getCurId());
        dto.setOrgId(entity.getOrgId());
        dto.setCurCd(entity.getCurCd());
        dto.setCurName(entity.getCurName());
        dto.setCountryName(entity.getCountryName());
        dto.setCurrencyFormat(entity.getCurrencyFormat());
        dto.setRemarks(entity.getRemarks());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}