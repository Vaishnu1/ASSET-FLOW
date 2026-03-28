package com.sams.service.impl;

import com.sams.dto.SrTatTempDTO;
import com.sams.entity.SrTatTemp;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SrTatTempRepository;
import com.sams.service.SrTatTempService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SrTatTempServiceImpl implements SrTatTempService {

    private final SrTatTempRepository repository;

    @Override
    @Transactional
    public SrTatTempDTO create(SrTatTempDTO dto) {
        SrTatTemp entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SrTatTempDTO getById(Long id) {
        SrTatTemp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTatTemp not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SrTatTempDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SrTatTempDTO update(Long id, SrTatTempDTO dto) {
        SrTatTemp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTatTemp not found with ID: " + id));
        SrTatTemp mapped = mapToEntity(dto);
        mapped.setSrTatTempId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SrTatTemp entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SrTatTemp not found with ID: " + id));
        repository.delete(entity);
    }

    private SrTatTemp mapToEntity(SrTatTempDTO dto) {
        SrTatTemp entity = new SrTatTemp();
        entity.setSrTatTempId(dto.getSrTatTempId());
        entity.setStatus(dto.getStatus());
        entity.setFromDate(dto.getFromDate());
        entity.setToDates(dto.getToDates());
        entity.setTimeDiff(dto.getTimeDiff());
        entity.setTimeDiffHrs(dto.getTimeDiffHrs());
        return entity;
    }

    private SrTatTempDTO mapToDTO(SrTatTemp entity) {
        SrTatTempDTO dto = new SrTatTempDTO();
        dto.setSrTatTempId(entity.getSrTatTempId());
        dto.setStatus(entity.getStatus());
        dto.setFromDate(entity.getFromDate());
        dto.setToDates(entity.getToDates());
        dto.setTimeDiff(entity.getTimeDiff());
        dto.setTimeDiffHrs(entity.getTimeDiffHrs());
        return dto;
    }
}