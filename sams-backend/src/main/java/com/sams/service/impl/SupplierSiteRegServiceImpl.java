package com.sams.service.impl;

import com.sams.dto.SupplierSiteRegDTO;
import com.sams.entity.SupplierSiteReg;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SupplierSiteRegRepository;
import com.sams.service.SupplierSiteRegService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SupplierSiteRegServiceImpl implements SupplierSiteRegService {

    private final SupplierSiteRegRepository repository;

    @Override
    @Transactional
    public SupplierSiteRegDTO createSupplierSiteReg(SupplierSiteRegDTO dto) {
        SupplierSiteReg entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SupplierSiteRegDTO getSupplierSiteRegById(Long id) {
        SupplierSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteReg not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SupplierSiteRegDTO> getAllSupplierSiteRegs() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SupplierSiteRegDTO updateSupplierSiteReg(Long id, SupplierSiteRegDTO dto) {
        SupplierSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteReg not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        SupplierSiteReg mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteSupplierSiteReg(Long id) {
        SupplierSiteReg entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SupplierSiteReg not found with ID: " + id));
        repository.delete(entity);
    }

    private SupplierSiteReg mapToEntity(SupplierSiteRegDTO dto) {
        SupplierSiteReg entity = new SupplierSiteReg();
        entity.setSupplierSiteRegId(dto.getSupplierSiteRegId());
        entity.setRegistrationName(dto.getRegistrationName());
        entity.setRegistrationNo(dto.getRegistrationNo());
        entity.setSupplierSiteId(dto.getSupplierSiteId());
        return entity;
    }

    private SupplierSiteRegDTO mapToDTO(SupplierSiteReg entity) {
        SupplierSiteRegDTO dto = new SupplierSiteRegDTO();
        dto.setId(entity.getId());
        dto.setSupplierSiteRegId(entity.getSupplierSiteRegId());
        dto.setRegistrationName(entity.getRegistrationName());
        dto.setRegistrationNo(entity.getRegistrationNo());
        dto.setSupplierSiteId(entity.getSupplierSiteId());
        return dto;
    }
}