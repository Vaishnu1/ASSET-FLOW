package com.sams.service.impl;

import com.sams.dto.ServiceTypeDTO;
import com.sams.entity.ServiceType;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ServiceTypeRepository;
import com.sams.service.ServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceTypeServiceImpl implements ServiceTypeService {

    private final ServiceTypeRepository repository;

    @Override
    @Transactional
    public ServiceTypeDTO create(ServiceTypeDTO dto) {
        ServiceType entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ServiceTypeDTO getById(Long id) {
        ServiceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ServiceTypeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ServiceTypeDTO update(Long id, ServiceTypeDTO dto) {
        ServiceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with ID: " + id));
        ServiceType mapped = mapToEntity(dto);
        mapped.setServiceTypeId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ServiceType entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ServiceType not found with ID: " + id));
        repository.delete(entity);
    }

    private ServiceType mapToEntity(ServiceTypeDTO dto) {
        ServiceType entity = new ServiceType();
        entity.setServiceTypeId(dto.getServiceTypeId());
        entity.setServiceType(dto.getServiceType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ServiceTypeDTO mapToDTO(ServiceType entity) {
        ServiceTypeDTO dto = new ServiceTypeDTO();
        dto.setServiceTypeId(entity.getServiceTypeId());
        dto.setServiceType(entity.getServiceType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}