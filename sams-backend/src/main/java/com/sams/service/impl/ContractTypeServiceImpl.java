package com.sams.service.impl;

import com.sams.dto.ContractTypeDTO;
import com.sams.entity.ContractType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractTypeRepository;
import com.sams.service.ContractTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractTypeServiceImpl implements ContractTypeService {

    private final ContractTypeRepository repository;

    @Override
    @Transactional
    public ContractTypeDTO create(ContractTypeDTO dto) {
        ContractType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractTypeDTO getById(Long id) {
        ContractType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractTypeDTO update(Long id, ContractTypeDTO dto) {
        ContractType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractType not found with ID: " + id));
        ContractType mapped = mapToEntity(dto);
        mapped.setContractTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractType not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractType mapToEntity(ContractTypeDTO dto) {
        ContractType entity = new ContractType();
        entity.setContractTypeId(dto.getContractTypeId());
        entity.setOrgId(dto.getOrgId());
        entity.setContractTypeName(dto.getContractTypeName());
        entity.setContractTypeDesc(dto.getContractTypeDesc());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ContractTypeDTO mapToDTO(ContractType entity) {
        ContractTypeDTO dto = new ContractTypeDTO();
        dto.setContractTypeId(entity.getContractTypeId());
        dto.setOrgId(entity.getOrgId());
        dto.setContractTypeName(entity.getContractTypeName());
        dto.setContractTypeDesc(entity.getContractTypeDesc());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}