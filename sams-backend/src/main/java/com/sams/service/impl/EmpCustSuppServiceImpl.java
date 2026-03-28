package com.sams.service.impl;

import com.sams.dto.EmpCustSuppDTO;
import com.sams.entity.EmpCustSupp;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmpCustSuppRepository;
import com.sams.service.EmpCustSuppService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmpCustSuppServiceImpl implements EmpCustSuppService {

    private final EmpCustSuppRepository repository;

    @Override
    @Transactional
    public EmpCustSuppDTO createEmpCustSupp(EmpCustSuppDTO dto) {
        EmpCustSupp entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmpCustSuppDTO getEmpCustSuppById(Long id) {
        EmpCustSupp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpCustSupp not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmpCustSuppDTO> getAllEmpCustSupps() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmpCustSuppDTO updateEmpCustSupp(Long id, EmpCustSuppDTO dto) {
        EmpCustSupp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpCustSupp not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        EmpCustSupp mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteEmpCustSupp(Long id) {
        EmpCustSupp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmpCustSupp not found with ID: " + id));
        repository.delete(entity);
    }

    private EmpCustSupp mapToEntity(EmpCustSuppDTO dto) {
        EmpCustSupp entity = new EmpCustSupp();
        entity.setCustSuppEmpId(dto.getCustSuppEmpId());
        entity.setCustSuppEmpName(dto.getCustSuppEmpName());
        entity.setCustSuppEmpEmailId(dto.getCustSuppEmpEmailId());
        entity.setCustSuppEmpContactNo(dto.getCustSuppEmpContactNo());
        entity.setCustSuppEmpCode(dto.getCustSuppEmpCode());
        return entity;
    }

    private EmpCustSuppDTO mapToDTO(EmpCustSupp entity) {
        EmpCustSuppDTO dto = new EmpCustSuppDTO();
        dto.setId(entity.getId());
        dto.setCustSuppEmpId(entity.getCustSuppEmpId());
        dto.setCustSuppEmpName(entity.getCustSuppEmpName());
        dto.setCustSuppEmpEmailId(entity.getCustSuppEmpEmailId());
        dto.setCustSuppEmpContactNo(entity.getCustSuppEmpContactNo());
        dto.setCustSuppEmpCode(entity.getCustSuppEmpCode());
        return dto;
    }
}