package com.sams.service.impl;

import com.sams.dto.PurchaseTcParametersDTO;
import com.sams.entity.PurchaseTcParameters;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PurchaseTcParametersRepository;
import com.sams.service.PurchaseTcParametersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PurchaseTcParametersServiceImpl implements PurchaseTcParametersService {

    private final PurchaseTcParametersRepository repository;

    @Override
    @Transactional
    public PurchaseTcParametersDTO create(PurchaseTcParametersDTO dto) {
        PurchaseTcParameters entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PurchaseTcParametersDTO getById(Long id) {
        PurchaseTcParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcParameters not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PurchaseTcParametersDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PurchaseTcParametersDTO update(Long id, PurchaseTcParametersDTO dto) {
        PurchaseTcParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcParameters not found with ID: " + id));
        PurchaseTcParameters mapped = mapToEntity(dto);
        mapped.setTcParameterId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PurchaseTcParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PurchaseTcParameters not found with ID: " + id));
        repository.delete(entity);
    }

    private PurchaseTcParameters mapToEntity(PurchaseTcParametersDTO dto) {
        PurchaseTcParameters entity = new PurchaseTcParameters();
        entity.setTcParameterId(dto.getTcParameterId());
        entity.setOrgId(dto.getOrgId());
        entity.setTcParameterName(dto.getTcParameterName());
        entity.setTcParameterInputType(dto.getTcParameterInputType());
        entity.setTcParameterInputValues(dto.getTcParameterInputValues());
        entity.setTcParameterRemarks(dto.getTcParameterRemarks());
        entity.setActive(dto.getActive());
        entity.setTriggerEvent(dto.getTriggerEvent());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        entity.setTcParameterFor(dto.getTcParameterFor());
        entity.setIsEditable(dto.getIsEditable());
        return entity;
    }

    private PurchaseTcParametersDTO mapToDTO(PurchaseTcParameters entity) {
        PurchaseTcParametersDTO dto = new PurchaseTcParametersDTO();
        dto.setTcParameterId(entity.getTcParameterId());
        dto.setOrgId(entity.getOrgId());
        dto.setTcParameterName(entity.getTcParameterName());
        dto.setTcParameterInputType(entity.getTcParameterInputType());
        dto.setTcParameterInputValues(entity.getTcParameterInputValues());
        dto.setTcParameterRemarks(entity.getTcParameterRemarks());
        dto.setActive(entity.getActive());
        dto.setTriggerEvent(entity.getTriggerEvent());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        dto.setTcParameterFor(entity.getTcParameterFor());
        dto.setIsEditable(entity.getIsEditable());
        return dto;
    }
}