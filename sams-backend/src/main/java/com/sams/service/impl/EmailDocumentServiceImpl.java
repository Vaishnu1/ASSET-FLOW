package com.sams.service.impl;

import com.sams.dto.EmailDocumentDTO;
import com.sams.entity.EmailDocument;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailDocumentRepository;
import com.sams.service.EmailDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailDocumentServiceImpl implements EmailDocumentService {

    private final EmailDocumentRepository repository;

    @Override
    @Transactional
    public EmailDocumentDTO create(EmailDocumentDTO dto) {
        EmailDocument entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailDocumentDTO getById(Long id) {
        EmailDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailDocument not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailDocumentDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailDocumentDTO update(Long id, EmailDocumentDTO dto) {
        EmailDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailDocument not found with ID: " + id));
        EmailDocument mapped = mapToEntity(dto);
        mapped.setEmailMessageDocId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailDocument entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailDocument not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailDocument mapToEntity(EmailDocumentDTO dto) {
        EmailDocument entity = new EmailDocument();
        entity.setEmailMessageDocId(dto.getEmailMessageDocId());
        entity.setEmailMessageId(dto.getEmailMessageId());
        entity.setFileId(dto.getFileId());
        entity.setFilePath(dto.getFilePath());
        entity.setFileName(dto.getFileName());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private EmailDocumentDTO mapToDTO(EmailDocument entity) {
        EmailDocumentDTO dto = new EmailDocumentDTO();
        dto.setEmailMessageDocId(entity.getEmailMessageDocId());
        dto.setEmailMessageId(entity.getEmailMessageId());
        dto.setFileId(entity.getFileId());
        dto.setFilePath(entity.getFilePath());
        dto.setFileName(entity.getFileName());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}