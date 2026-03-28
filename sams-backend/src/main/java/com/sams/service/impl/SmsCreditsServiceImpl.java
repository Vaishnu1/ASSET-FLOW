package com.sams.service.impl;

import com.sams.dto.SmsCreditsDTO;
import com.sams.entity.SmsCredits;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SmsCreditsRepository;
import com.sams.service.SmsCreditsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SmsCreditsServiceImpl implements SmsCreditsService {

    private final SmsCreditsRepository repository;

    @Override
    @Transactional
    public SmsCreditsDTO create(SmsCreditsDTO dto) {
        SmsCredits entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SmsCreditsDTO getById(Long id) {
        SmsCredits entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsCredits not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SmsCreditsDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SmsCreditsDTO update(Long id, SmsCreditsDTO dto) {
        SmsCredits entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsCredits not found with ID: " + id));
        SmsCredits mapped = mapToEntity(dto);
        mapped.setSmsCreditsId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SmsCredits entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsCredits not found with ID: " + id));
        repository.delete(entity);
    }

    private SmsCredits mapToEntity(SmsCreditsDTO dto) {
        SmsCredits entity = new SmsCredits();
        entity.setSmsCreditsId(dto.getSmsCreditsId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setCreditLimit(dto.getCreditLimit());
        entity.setTotalSmsSent(dto.getTotalSmsSent());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private SmsCreditsDTO mapToDTO(SmsCredits entity) {
        SmsCreditsDTO dto = new SmsCreditsDTO();
        dto.setSmsCreditsId(entity.getSmsCreditsId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setCreditLimit(entity.getCreditLimit());
        dto.setTotalSmsSent(entity.getTotalSmsSent());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}