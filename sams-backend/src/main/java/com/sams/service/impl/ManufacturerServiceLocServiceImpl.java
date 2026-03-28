package com.sams.service.impl;

import com.sams.dto.ManufacturerServiceLocDTO;
import com.sams.entity.ManufacturerServiceLoc;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.ManufacturerServiceLocRepository;
import com.sams.service.ManufacturerServiceLocService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ManufacturerServiceLocServiceImpl implements ManufacturerServiceLocService {

    private final ManufacturerServiceLocRepository repository;

    @Override
    @Transactional
    public ManufacturerServiceLocDTO create(ManufacturerServiceLocDTO dto) {
        ManufacturerServiceLoc entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public ManufacturerServiceLocDTO getById(Long id) {
        ManufacturerServiceLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerServiceLoc not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<ManufacturerServiceLocDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ManufacturerServiceLocDTO update(Long id, ManufacturerServiceLocDTO dto) {
        ManufacturerServiceLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerServiceLoc not found with ID: " + id));
        ManufacturerServiceLoc mapped = mapToEntity(dto);
        mapped.setManufacturerServiceLocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        ManufacturerServiceLoc entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ManufacturerServiceLoc not found with ID: " + id));
        repository.delete(entity);
    }

    private ManufacturerServiceLoc mapToEntity(ManufacturerServiceLocDTO dto) {
        ManufacturerServiceLoc entity = new ManufacturerServiceLoc();
        entity.setManufacturerServiceLocId(dto.getManufacturerServiceLocId());
        entity.setOrgId(dto.getOrgId());
        entity.setManufacturerId(dto.getManufacturerId());
        entity.setServiceLocationName(dto.getServiceLocationName());
        entity.setAddress1(dto.getAddress1());
        entity.setAddress2(dto.getAddress2());
        entity.setCity(dto.getCity());
        entity.setState(dto.getState());
        entity.setCountry(dto.getCountry());
        entity.setPostalCode(dto.getPostalCode());
        entity.setContactPersonName(dto.getContactPersonName());
        entity.setContactPersonLandlineNo(dto.getContactPersonLandlineNo());
        entity.setContactPersonPhoneNo(dto.getContactPersonPhoneNo());
        entity.setContactPersonEmailId(dto.getContactPersonEmailId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private ManufacturerServiceLocDTO mapToDTO(ManufacturerServiceLoc entity) {
        ManufacturerServiceLocDTO dto = new ManufacturerServiceLocDTO();
        dto.setManufacturerServiceLocId(entity.getManufacturerServiceLocId());
        dto.setOrgId(entity.getOrgId());
        dto.setManufacturerId(entity.getManufacturerId());
        dto.setServiceLocationName(entity.getServiceLocationName());
        dto.setAddress1(entity.getAddress1());
        dto.setAddress2(entity.getAddress2());
        dto.setCity(entity.getCity());
        dto.setState(entity.getState());
        dto.setCountry(entity.getCountry());
        dto.setPostalCode(entity.getPostalCode());
        dto.setContactPersonName(entity.getContactPersonName());
        dto.setContactPersonLandlineNo(entity.getContactPersonLandlineNo());
        dto.setContactPersonPhoneNo(entity.getContactPersonPhoneNo());
        dto.setContactPersonEmailId(entity.getContactPersonEmailId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}