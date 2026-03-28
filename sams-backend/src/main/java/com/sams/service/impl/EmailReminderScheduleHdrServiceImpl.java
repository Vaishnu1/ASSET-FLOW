package com.sams.service.impl;

import com.sams.dto.EmailReminderScheduleHdrDTO;
import com.sams.entity.EmailReminderScheduleHdr;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailReminderScheduleHdrRepository;
import com.sams.service.EmailReminderScheduleHdrService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailReminderScheduleHdrServiceImpl implements EmailReminderScheduleHdrService {

    private final EmailReminderScheduleHdrRepository repository;

    @Override
    @Transactional
    public EmailReminderScheduleHdrDTO create(EmailReminderScheduleHdrDTO dto) {
        EmailReminderScheduleHdr entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailReminderScheduleHdrDTO getById(Long id) {
        EmailReminderScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleHdr not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailReminderScheduleHdrDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailReminderScheduleHdrDTO update(Long id, EmailReminderScheduleHdrDTO dto) {
        EmailReminderScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleHdr not found with ID: " + id));
        EmailReminderScheduleHdr mapped = mapToEntity(dto);
        mapped.setEmailReminderScheduleHdrId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailReminderScheduleHdr entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleHdr not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailReminderScheduleHdr mapToEntity(EmailReminderScheduleHdrDTO dto) {
        EmailReminderScheduleHdr entity = new EmailReminderScheduleHdr();
        entity.setEmailReminderScheduleHdrId(dto.getEmailReminderScheduleHdrId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setProcessId(dto.getProcessId());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailReminderScheduleHdrDTO mapToDTO(EmailReminderScheduleHdr entity) {
        EmailReminderScheduleHdrDTO dto = new EmailReminderScheduleHdrDTO();
        dto.setEmailReminderScheduleHdrId(entity.getEmailReminderScheduleHdrId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setProcessId(entity.getProcessId());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}