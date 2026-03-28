package com.sams.service.impl;

import com.sams.dto.InsuranceTypeDTO;
import com.sams.entity.InsuranceType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.InsuranceTypeRepository;
import com.sams.service.InsuranceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InsuranceTypeServiceImpl implements InsuranceTypeService {

    private final InsuranceTypeRepository repository;

    @Override
    @Transactional
    public InsuranceTypeDTO create(InsuranceTypeDTO dto) {
        InsuranceType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public InsuranceTypeDTO getById(Long id) {
        InsuranceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InsuranceType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<InsuranceTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public InsuranceTypeDTO update(Long id, InsuranceTypeDTO dto) {
        InsuranceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InsuranceType not found with ID: " + id));
        InsuranceType mapped = mapToEntity(dto);
        mapped.setInsuranceTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        InsuranceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("InsuranceType not found with ID: " + id));
        repository.delete(entity);
    }

    private InsuranceType mapToEntity(InsuranceTypeDTO dto) {
        InsuranceType entity = new InsuranceType();
        entity.setInsuranceTypeId(dto.getInsuranceTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setInsuranceTypeName(dto.getInsuranceTypeName());
        entity.setInsuranceTypeDesc(dto.getInsuranceTypeDesc());
        entity.setInsuranceTypeFor(dto.getInsuranceTypeFor());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private InsuranceTypeDTO mapToDTO(InsuranceType entity) {
        InsuranceTypeDTO dto = new InsuranceTypeDTO();
        dto.setInsuranceTypeId(entity.getInsuranceTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setInsuranceTypeName(entity.getInsuranceTypeName());
        dto.setInsuranceTypeDesc(entity.getInsuranceTypeDesc());
        dto.setInsuranceTypeFor(entity.getInsuranceTypeFor());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}