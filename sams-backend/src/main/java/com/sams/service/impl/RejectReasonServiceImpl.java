package com.sams.service.impl;

import com.sams.dto.RejectReasonDTO;
import com.sams.entity.RejectReason;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.RejectReasonRepository;
import com.sams.service.RejectReasonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RejectReasonServiceImpl implements RejectReasonService {

    private final RejectReasonRepository repository;

    @Override
    @Transactional
    public RejectReasonDTO create(RejectReasonDTO dto) {
        RejectReason entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public RejectReasonDTO getById(Long id) {
        RejectReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RejectReason not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<RejectReasonDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public RejectReasonDTO update(Long id, RejectReasonDTO dto) {
        RejectReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RejectReason not found with ID: " + id));
        RejectReason mapped = mapToEntity(dto);
        mapped.setRejectReasonId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        RejectReason entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("RejectReason not found with ID: " + id));
        repository.delete(entity);
    }

    private RejectReason mapToEntity(RejectReasonDTO dto) {
        RejectReason entity = new RejectReason();
        entity.setRejectReasonId(dto.getRejectReasonId());
        entity.setRejectReason(dto.getRejectReason());
        return entity;
    }

    private RejectReasonDTO mapToDTO(RejectReason entity) {
        RejectReasonDTO dto = new RejectReasonDTO();
        dto.setRejectReasonId(entity.getRejectReasonId());
        dto.setRejectReason(entity.getRejectReason());
        return dto;
    }
}