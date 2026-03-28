package com.sams.service.impl;

import com.sams.dto.EmailInformationDTO;
import com.sams.entity.EmailInformation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailInformationRepository;
import com.sams.service.EmailInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailInformationServiceImpl implements EmailInformationService {

    private final EmailInformationRepository repository;

    @Override
    @Transactional
    public EmailInformationDTO create(EmailInformationDTO dto) {
        EmailInformation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailInformationDTO getById(Long id) {
        EmailInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailInformation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailInformationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailInformationDTO update(Long id, EmailInformationDTO dto) {
        EmailInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailInformation not found with ID: " + id));
        EmailInformation mapped = mapToEntity(dto);
        mapped.setEmailInformationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailInformation not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailInformation mapToEntity(EmailInformationDTO dto) {
        EmailInformation entity = new EmailInformation();
        entity.setEmailInformationId(dto.getEmailInformationId());
        entity.setPriority(dto.getPriority());
        entity.setMessageFromEmail(dto.getMessageFromEmail());
        entity.setMessageTo(dto.getMessageTo());
        entity.setEmailSubject(dto.getEmailSubject());
        entity.setEmailBody(dto.getEmailBody());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private EmailInformationDTO mapToDTO(EmailInformation entity) {
        EmailInformationDTO dto = new EmailInformationDTO();
        dto.setEmailInformationId(entity.getEmailInformationId());
        dto.setPriority(entity.getPriority());
        dto.setMessageFromEmail(entity.getMessageFromEmail());
        dto.setMessageTo(entity.getMessageTo());
        dto.setEmailSubject(entity.getEmailSubject());
        dto.setEmailBody(entity.getEmailBody());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}