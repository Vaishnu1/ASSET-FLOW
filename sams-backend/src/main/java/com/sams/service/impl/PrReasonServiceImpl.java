package com.sams.service.impl;

import com.sams.dto.PrReasonDTO;
import com.sams.entity.PrReason;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrReasonRepository;
import com.sams.service.PrReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrReasonServiceImpl implements PrReasonService {

    private final PrReasonRepository repository;

    @Override
    @Transactional
    public PrReasonDTO create(PrReasonDTO dto) {
        PrReason entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrReasonDTO getById(Long id) {
        PrReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrReason not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrReasonDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrReasonDTO update(Long id, PrReasonDTO dto) {
        PrReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrReason not found with ID: " + id));
        PrReason mapped = mapToEntity(dto);
        mapped.setPrReasonId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrReason not found with ID: " + id));
        repository.delete(entity);
    }

    private PrReason mapToEntity(PrReasonDTO dto) {
        PrReason entity = new PrReason();
        entity.setPrReasonId(dto.getPrReasonId());
        entity.setPrReasonName(dto.getPrReasonName());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private PrReasonDTO mapToDTO(PrReason entity) {
        PrReasonDTO dto = new PrReasonDTO();
        dto.setPrReasonId(entity.getPrReasonId());
        dto.setPrReasonName(entity.getPrReasonName());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}