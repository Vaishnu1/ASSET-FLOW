package com.sams.service.impl;

import com.sams.dto.SmsMessageDtlDTO;
import com.sams.entity.SmsMessageDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SmsMessageDtlRepository;
import com.sams.service.SmsMessageDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SmsMessageDtlServiceImpl implements SmsMessageDtlService {

    private final SmsMessageDtlRepository repository;

    @Override
    @Transactional
    public SmsMessageDtlDTO create(SmsMessageDtlDTO dto) {
        SmsMessageDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SmsMessageDtlDTO getById(Long id) {
        SmsMessageDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SmsMessageDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SmsMessageDtlDTO update(Long id, SmsMessageDtlDTO dto) {
        SmsMessageDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageDtl not found with ID: " + id));
        SmsMessageDtl mapped = mapToEntity(dto);
        mapped.setSmsMessageDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SmsMessageDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsMessageDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private SmsMessageDtl mapToEntity(SmsMessageDtlDTO dto) {
        SmsMessageDtl entity = new SmsMessageDtl();
        entity.setSmsMessageDtlId(dto.getSmsMessageDtlId());
        entity.setSmsMessageHdrId(dto.getSmsMessageHdrId());
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

    private SmsMessageDtlDTO mapToDTO(SmsMessageDtl entity) {
        SmsMessageDtlDTO dto = new SmsMessageDtlDTO();
        dto.setSmsMessageDtlId(entity.getSmsMessageDtlId());
        dto.setSmsMessageHdrId(entity.getSmsMessageHdrId());
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