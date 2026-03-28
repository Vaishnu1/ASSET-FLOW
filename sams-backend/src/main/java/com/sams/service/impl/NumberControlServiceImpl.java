package com.sams.service.impl;

import com.sams.dto.NumberControlDTO;
import com.sams.entity.NumberControl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.NumberControlRepository;
import com.sams.service.NumberControlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NumberControlServiceImpl implements NumberControlService {

    private final NumberControlRepository repository;

    @Override
    @Transactional
    public NumberControlDTO create(NumberControlDTO dto) {
        NumberControl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public NumberControlDTO getById(Long id) {
        NumberControl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<NumberControlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public NumberControlDTO update(Long id, NumberControlDTO dto) {
        NumberControl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControl not found with ID: " + id));
        NumberControl mapped = mapToEntity(dto);
        mapped.setNumberControlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        NumberControl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("NumberControl not found with ID: " + id));
        repository.delete(entity);
    }

    private NumberControl mapToEntity(NumberControlDTO dto) {
        NumberControl entity = new NumberControl();
        entity.setNumberControlId(dto.getNumberControlId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setNumberControlName(dto.getNumberControlName());
        entity.setNumberControlDesc(dto.getNumberControlDesc());
        entity.setNumberControlModule(dto.getNumberControlModule());
        entity.setPrefixCd(dto.getPrefixCd());
        entity.setSuffixCd(dto.getSuffixCd());
        entity.setLastNumber(dto.getLastNumber());
        entity.setMaxNumber(dto.getMaxNumber());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private NumberControlDTO mapToDTO(NumberControl entity) {
        NumberControlDTO dto = new NumberControlDTO();
        dto.setNumberControlId(entity.getNumberControlId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setNumberControlName(entity.getNumberControlName());
        dto.setNumberControlDesc(entity.getNumberControlDesc());
        dto.setNumberControlModule(entity.getNumberControlModule());
        dto.setPrefixCd(entity.getPrefixCd());
        dto.setSuffixCd(entity.getSuffixCd());
        dto.setLastNumber(entity.getLastNumber());
        dto.setMaxNumber(entity.getMaxNumber());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}