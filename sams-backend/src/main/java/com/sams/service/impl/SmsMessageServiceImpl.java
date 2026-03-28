package com.sams.service.impl;

import com.sams.dto.SmsMessageDTO;
import com.sams.entity.SmsMessage;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SmsMessageRepository;
import com.sams.service.SmsMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SmsMessageServiceImpl implements SmsMessageService {

    private final SmsMessageRepository repository;

    @Override
    @Transactional
    public SmsMessageDTO create(SmsMessageDTO dto) {
        SmsMessage entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SmsMessageDTO getById(Long id) {
        SmsMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessage not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SmsMessageDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SmsMessageDTO update(Long id, SmsMessageDTO dto) {
        SmsMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessage not found with ID: " + id));
        SmsMessage mapped = mapToEntity(dto);
        mapped.setSmsMessageId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SmsMessage entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessage not found with ID: " + id));
        repository.delete(entity);
    }

    private SmsMessage mapToEntity(SmsMessageDTO dto) {
        SmsMessage entity = new SmsMessage();
        entity.setSmsMessageId(dto.getSmsMessageId());
        entity.setSmsInformationId(dto.getSmsInformationId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setLocationName(dto.getLocationName());
        entity.setMessageSend(dto.getMessageSend());
        entity.setMessageNew(dto.getMessageNew());
        entity.setMessageDelete(dto.getMessageDelete());
        entity.setMsgDestinationNumber(dto.getMsgDestinationNumber());
        entity.setMsgDestinationName(dto.getMsgDestinationName());
        entity.setMsgDestinationId(dto.getMsgDestinationId());
        entity.setDndCategory(dto.getDndCategory());
        entity.setMsgCount(dto.getMsgCount());
        entity.setReferenceText(dto.getReferenceText());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setSentDt(dto.getSentDt());
        return entity;
    }

    private SmsMessageDTO mapToDTO(SmsMessage entity) {
        SmsMessageDTO dto = new SmsMessageDTO();
        dto.setSmsMessageId(entity.getSmsMessageId());
        dto.setSmsInformationId(entity.getSmsInformationId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setLocationName(entity.getLocationName());
        dto.setMessageSend(entity.getMessageSend());
        dto.setMessageNew(entity.getMessageNew());
        dto.setMessageDelete(entity.getMessageDelete());
        dto.setMsgDestinationNumber(entity.getMsgDestinationNumber());
        dto.setMsgDestinationName(entity.getMsgDestinationName());
        dto.setMsgDestinationId(entity.getMsgDestinationId());
        dto.setDndCategory(entity.getDndCategory());
        dto.setMsgCount(entity.getMsgCount());
        dto.setReferenceText(entity.getReferenceText());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setSentDt(entity.getSentDt());
        return dto;
    }
}