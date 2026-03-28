package com.sams.service.impl;

import com.sams.dto.EmailSenderIdQueryDTO;
import com.sams.entity.EmailSenderIdQuery;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailSenderIdQueryRepository;
import com.sams.service.EmailSenderIdQueryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailSenderIdQueryServiceImpl implements EmailSenderIdQueryService {

    private final EmailSenderIdQueryRepository repository;

    @Override
    @Transactional
    public EmailSenderIdQueryDTO create(EmailSenderIdQueryDTO dto) {
        EmailSenderIdQuery entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailSenderIdQueryDTO getById(Long id) {
        EmailSenderIdQuery entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSenderIdQuery not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailSenderIdQueryDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailSenderIdQueryDTO update(Long id, EmailSenderIdQueryDTO dto) {
        EmailSenderIdQuery entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSenderIdQuery not found with ID: " + id));
        EmailSenderIdQuery mapped = mapToEntity(dto);
        mapped.setEsid(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailSenderIdQuery entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailSenderIdQuery not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailSenderIdQuery mapToEntity(EmailSenderIdQueryDTO dto) {
        EmailSenderIdQuery entity = new EmailSenderIdQuery();
        entity.setEsid(dto.getEsid());
        entity.setProcessId(dto.getProcessId());
        entity.setKeyword(dto.getKeyword());
        entity.setSqlq(dto.getSqlq());
        entity.setNoOfParameters(dto.getNoOfParameters());
        entity.setRemarks(dto.getRemarks());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailSenderIdQueryDTO mapToDTO(EmailSenderIdQuery entity) {
        EmailSenderIdQueryDTO dto = new EmailSenderIdQueryDTO();
        dto.setEsid(entity.getEsid());
        dto.setProcessId(entity.getProcessId());
        dto.setKeyword(entity.getKeyword());
        dto.setSqlq(entity.getSqlq());
        dto.setNoOfParameters(entity.getNoOfParameters());
        dto.setRemarks(entity.getRemarks());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}