package com.sams.service.impl;

import com.sams.dto.SrScheduleFrequencyDTO;
import com.sams.entity.SrScheduleFrequency;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrScheduleFrequencyRepository;
import com.sams.service.SrScheduleFrequencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrScheduleFrequencyServiceImpl implements SrScheduleFrequencyService {

    private final SrScheduleFrequencyRepository repository;

    @Override
    @Transactional
    public SrScheduleFrequencyDTO create(SrScheduleFrequencyDTO dto) {
        SrScheduleFrequency entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrScheduleFrequencyDTO getById(Long id) {
        SrScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrScheduleFrequency not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrScheduleFrequencyDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrScheduleFrequencyDTO update(Long id, SrScheduleFrequencyDTO dto) {
        SrScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrScheduleFrequency not found with ID: " + id));
        SrScheduleFrequency mapped = mapToEntity(dto);
        mapped.setSrScheduleFrequencyId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrScheduleFrequency not found with ID: " + id));
        repository.delete(entity);
    }

    private SrScheduleFrequency mapToEntity(SrScheduleFrequencyDTO dto) {
        SrScheduleFrequency entity = new SrScheduleFrequency();
        entity.setSrScheduleFrequencyId(dto.getSrScheduleFrequencyId());
        entity.setFrequencyId(dto.getFrequencyId());
        entity.setFrequencyName(dto.getFrequencyName());
        entity.setOrgId(dto.getOrgId());
        entity.setActive(dto.getActive());
        return entity;
    }

    private SrScheduleFrequencyDTO mapToDTO(SrScheduleFrequency entity) {
        SrScheduleFrequencyDTO dto = new SrScheduleFrequencyDTO();
        dto.setSrScheduleFrequencyId(entity.getSrScheduleFrequencyId());
        dto.setFrequencyId(entity.getFrequencyId());
        dto.setFrequencyName(entity.getFrequencyName());
        dto.setOrgId(entity.getOrgId());
        dto.setActive(entity.getActive());
        return dto;
    }
}