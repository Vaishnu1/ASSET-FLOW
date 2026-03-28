package com.sams.service.impl;

import com.sams.dto.EmailMessageDTO;
import com.sams.entity.EmailMessage;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailMessageRepository;
import com.sams.service.EmailMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailMessageServiceImpl implements EmailMessageService {

    private final EmailMessageRepository repository;

    @Override
    @Transactional
    public EmailMessageDTO create(EmailMessageDTO dto) {
        EmailMessage entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailMessageDTO getById(Long id) {
        EmailMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailMessage not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailMessageDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailMessageDTO update(Long id, EmailMessageDTO dto) {
        EmailMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailMessage not found with ID: " + id));
        EmailMessage mapped = mapToEntity(dto);
        mapped.setEmailMessageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailMessage not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailMessage mapToEntity(EmailMessageDTO dto) {
        EmailMessage entity = new EmailMessage();
        entity.setEmailMessageId(dto.getEmailMessageId());
        entity.setEmailInformationId(dto.getEmailInformationId());
        entity.setLocationId(dto.getLocationId());
        entity.setMessageSend(dto.getMessageSend());
        entity.setMessageNew(dto.getMessageNew());
        entity.setMessageDelete(dto.getMessageDelete());
        entity.setMsgDestinationEmailId(dto.getMsgDestinationEmailId());
        entity.setMsgDestinationCcemailId(dto.getMsgDestinationCcemailId());
        entity.setReadState(dto.getReadState());
        entity.setUserId(dto.getUserId());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private EmailMessageDTO mapToDTO(EmailMessage entity) {
        EmailMessageDTO dto = new EmailMessageDTO();
        dto.setEmailMessageId(entity.getEmailMessageId());
        dto.setEmailInformationId(entity.getEmailInformationId());
        dto.setLocationId(entity.getLocationId());
        dto.setMessageSend(entity.getMessageSend());
        dto.setMessageNew(entity.getMessageNew());
        dto.setMessageDelete(entity.getMessageDelete());
        dto.setMsgDestinationEmailId(entity.getMsgDestinationEmailId());
        dto.setMsgDestinationCcemailId(entity.getMsgDestinationCcemailId());
        dto.setReadState(entity.getReadState());
        dto.setUserId(entity.getUserId());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}