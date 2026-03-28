package com.sams.service.impl;

import com.sams.dto.MaintScheduleFrequencyDTO;
import com.sams.entity.MaintScheduleFrequency;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MaintScheduleFrequencyRepository;
import com.sams.service.MaintScheduleFrequencyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MaintScheduleFrequencyServiceImpl implements MaintScheduleFrequencyService {

    private final MaintScheduleFrequencyRepository repository;

    @Override
    @Transactional
    public MaintScheduleFrequencyDTO create(MaintScheduleFrequencyDTO dto) {
        MaintScheduleFrequency entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MaintScheduleFrequencyDTO getById(Long id) {
        MaintScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleFrequency not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MaintScheduleFrequencyDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MaintScheduleFrequencyDTO update(Long id, MaintScheduleFrequencyDTO dto) {
        MaintScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleFrequency not found with ID: " + id));
        MaintScheduleFrequency mapped = mapToEntity(dto);
        mapped.setMaintScheduleFrequncyId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        MaintScheduleFrequency entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MaintScheduleFrequency not found with ID: " + id));
        repository.delete(entity);
    }

    private MaintScheduleFrequency mapToEntity(MaintScheduleFrequencyDTO dto) {
        MaintScheduleFrequency entity = new MaintScheduleFrequency();
        entity.setMaintScheduleFrequncyId(dto.getMaintScheduleFrequncyId());
        entity.setOrgId(dto.getOrgId());
        entity.setMaintScheduleFrequencyName(dto.getMaintScheduleFrequencyName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private MaintScheduleFrequencyDTO mapToDTO(MaintScheduleFrequency entity) {
        MaintScheduleFrequencyDTO dto = new MaintScheduleFrequencyDTO();
        dto.setMaintScheduleFrequncyId(entity.getMaintScheduleFrequncyId());
        dto.setOrgId(entity.getOrgId());
        dto.setMaintScheduleFrequencyName(entity.getMaintScheduleFrequencyName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}