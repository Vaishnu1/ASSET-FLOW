package com.sams.service.impl;

import com.sams.dto.CityDTO;
import com.sams.entity.City;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.CityRepository;
import com.sams.service.CityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CityServiceImpl implements CityService {

    private final CityRepository repository;

    @Override
    @Transactional
    public CityDTO create(CityDTO dto) {
        City entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public CityDTO getById(Long id) {
        City entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<CityDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public CityDTO update(Long id, CityDTO dto) {
        City entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found with ID: " + id));
        City mapped = mapToEntity(dto);
        mapped.setCityId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        City entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("City not found with ID: " + id));
        repository.delete(entity);
    }

    private City mapToEntity(CityDTO dto) {
        City entity = new City();
        entity.setCityId(dto.getCityId());
        entity.setCityName(dto.getCityName());
        entity.setStateId(dto.getStateId());
        entity.setStateName(dto.getStateName());
        entity.setCountryId(dto.getCountryId());
        entity.setCountryName(dto.getCountryName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private CityDTO mapToDTO(City entity) {
        CityDTO dto = new CityDTO();
        dto.setCityId(entity.getCityId());
        dto.setCityName(entity.getCityName());
        dto.setStateId(entity.getStateId());
        dto.setStateName(entity.getStateName());
        dto.setCountryId(entity.getCountryId());
        dto.setCountryName(entity.getCountryName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}