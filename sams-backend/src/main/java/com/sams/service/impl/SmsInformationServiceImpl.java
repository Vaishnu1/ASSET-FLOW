package com.sams.service.impl;

import com.sams.dto.SmsInformationDTO;
import com.sams.entity.SmsInformation;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.SmsInformationRepository;
import com.sams.service.SmsInformationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SmsInformationServiceImpl implements SmsInformationService {

    private final SmsInformationRepository repository;

    @Override
    @Transactional
    public SmsInformationDTO create(SmsInformationDTO dto) {
        SmsInformation entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public SmsInformationDTO getById(Long id) {
        SmsInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsInformation not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<SmsInformationDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public SmsInformationDTO update(Long id, SmsInformationDTO dto) {
        SmsInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsInformation not found with ID: " + id));
        SmsInformation mapped = mapToEntity(dto);
        mapped.setSmsInformationId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        SmsInformation entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("SmsInformation not found with ID: " + id));
        repository.delete(entity);
    }

    private SmsInformation mapToEntity(SmsInformationDTO dto) {
        SmsInformation entity = new SmsInformation();
        entity.setSmsInformationId(dto.getSmsInformationId());
        entity.setPriority(dto.getPriority());
        entity.setMessageFromNumber(dto.getMessageFromNumber());
        entity.setMessageFrom(dto.getMessageFrom());
        entity.setMsgText(dto.getMsgText());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        return entity;
    }

    private SmsInformationDTO mapToDTO(SmsInformation entity) {
        SmsInformationDTO dto = new SmsInformationDTO();
        dto.setSmsInformationId(entity.getSmsInformationId());
        dto.setPriority(entity.getPriority());
        dto.setMessageFromNumber(entity.getMessageFromNumber());
        dto.setMessageFrom(entity.getMessageFrom());
        dto.setMsgText(entity.getMsgText());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        return dto;
    }
}