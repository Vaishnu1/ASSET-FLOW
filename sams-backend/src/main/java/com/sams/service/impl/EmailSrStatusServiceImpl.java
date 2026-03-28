package com.sams.service.impl;

import com.sams.dto.EmailSrStatusDTO;
import com.sams.entity.EmailSrStatus;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailSrStatusRepository;
import com.sams.service.EmailSrStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailSrStatusServiceImpl implements EmailSrStatusService {

    private final EmailSrStatusRepository repository;

    @Override
    @Transactional
    public EmailSrStatusDTO create(EmailSrStatusDTO dto) {
        EmailSrStatus entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailSrStatusDTO getById(Long id) {
        EmailSrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSrStatus not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailSrStatusDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailSrStatusDTO update(Long id, EmailSrStatusDTO dto) {
        EmailSrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSrStatus not found with ID: " + id));
        EmailSrStatus mapped = mapToEntity(dto);
        mapped.setId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailSrStatus entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSrStatus not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailSrStatus mapToEntity(EmailSrStatusDTO dto) {
        EmailSrStatus entity = new EmailSrStatus();
        entity.setId(dto.getId());
        entity.setStatusName(dto.getStatusName());
        entity.setActive(dto.getActive());
        return entity;
    }

    private EmailSrStatusDTO mapToDTO(EmailSrStatus entity) {
        EmailSrStatusDTO dto = new EmailSrStatusDTO();
        dto.setId(entity.getId());
        dto.setStatusName(entity.getStatusName());
        dto.setActive(entity.getActive());
        return dto;
    }
}