package com.sams.service.impl;

import com.sams.dto.LocationParametersDTO;
import com.sams.entity.LocationParameters;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.LocationParametersRepository;
import com.sams.service.LocationParametersService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LocationParametersServiceImpl implements LocationParametersService {

    private final LocationParametersRepository repository;

    @Override
    @Transactional
    public LocationParametersDTO create(LocationParametersDTO dto) {
        LocationParameters entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public LocationParametersDTO getById(Long id) {
        LocationParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocationParameters not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<LocationParametersDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public LocationParametersDTO update(Long id, LocationParametersDTO dto) {
        LocationParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocationParameters not found with ID: " + id));
        LocationParameters mapped = mapToEntity(dto);
        mapped.setLocParameterId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        LocationParameters entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("LocationParameters not found with ID: " + id));
        repository.delete(entity);
    }

    private LocationParameters mapToEntity(LocationParametersDTO dto) {
        LocationParameters entity = new LocationParameters();
        entity.setLocParameterId(dto.getLocParameterId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setLocParameterName(dto.getLocParameterName());
        entity.setLocParameterEnabled(dto.getLocParameterEnabled());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private LocationParametersDTO mapToDTO(LocationParameters entity) {
        LocationParametersDTO dto = new LocationParametersDTO();
        dto.setLocParameterId(entity.getLocParameterId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setLocParameterName(entity.getLocParameterName());
        dto.setLocParameterEnabled(entity.getLocParameterEnabled());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}