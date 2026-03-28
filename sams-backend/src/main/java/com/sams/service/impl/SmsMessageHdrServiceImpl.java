package com.sams.service.impl;

import com.sams.dto.SmsMessageHdrDTO;
import com.sams.entity.SmsMessageHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SmsMessageHdrRepository;
import com.sams.service.SmsMessageHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SmsMessageHdrServiceImpl implements SmsMessageHdrService {

    private final SmsMessageHdrRepository repository;

    @Override
    @Transactional
    public SmsMessageHdrDTO create(SmsMessageHdrDTO dto) {
        SmsMessageHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SmsMessageHdrDTO getById(Long id) {
        SmsMessageHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SmsMessageHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SmsMessageHdrDTO update(Long id, SmsMessageHdrDTO dto) {
        SmsMessageHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageHdr not found with ID: " + id));
        SmsMessageHdr mapped = mapToEntity(dto);
        mapped.setSmsMessageHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SmsMessageHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private SmsMessageHdr mapToEntity(SmsMessageHdrDTO dto) {
        SmsMessageHdr entity = new SmsMessageHdr();
        entity.setSmsMessageHdrId(dto.getSmsMessageHdrId());
        entity.setPriority(dto.getPriority());
        entity.setMessageFromNumber(dto.getMessageFromNumber());
        entity.setMessageFrom(dto.getMessageFrom());
        entity.setMsgText(dto.getMsgText());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SmsMessageHdrDTO mapToDTO(SmsMessageHdr entity) {
        SmsMessageHdrDTO dto = new SmsMessageHdrDTO();
        dto.setSmsMessageHdrId(entity.getSmsMessageHdrId());
        dto.setPriority(entity.getPriority());
        dto.setMessageFromNumber(entity.getMessageFromNumber());
        dto.setMessageFrom(entity.getMessageFrom());
        dto.setMsgText(entity.getMsgText());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}