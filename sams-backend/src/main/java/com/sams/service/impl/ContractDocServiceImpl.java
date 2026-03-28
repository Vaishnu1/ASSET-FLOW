package com.sams.service.impl;

import com.sams.dto.ContractDocDTO;
import com.sams.entity.ContractDoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ContractDocRepository;
import com.sams.service.ContractDocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContractDocServiceImpl implements ContractDocService {

    private final ContractDocRepository repository;

    @Override
    @Transactional
    public ContractDocDTO create(ContractDocDTO dto) {
        ContractDoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ContractDocDTO getById(Long id) {
        ContractDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ContractDocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ContractDocDTO update(Long id, ContractDocDTO dto) {
        ContractDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDoc not found with ID: " + id));
        ContractDoc mapped = mapToEntity(dto);
        mapped.setContractDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ContractDoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ContractDoc not found with ID: " + id));
        repository.delete(entity);
    }

    private ContractDoc mapToEntity(ContractDocDTO dto) {
        ContractDoc entity = new ContractDoc();
        entity.setContractDocId(dto.getContractDocId());
        entity.setContractId(dto.getContractId());
        entity.setDocName(dto.getDocName());
        entity.setDocType(dto.getDocType());
        entity.setFilePath(dto.getFilePath());
        entity.setContentType(dto.getContentType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ContractDocDTO mapToDTO(ContractDoc entity) {
        ContractDocDTO dto = new ContractDocDTO();
        dto.setContractDocId(entity.getContractDocId());
        dto.setContractId(entity.getContractId());
        dto.setDocName(entity.getDocName());
        dto.setDocType(entity.getDocType());
        dto.setFilePath(entity.getFilePath());
        dto.setContentType(entity.getContentType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}