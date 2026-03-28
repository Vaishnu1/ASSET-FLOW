package com.sams.service.impl;

import com.sams.dto.EmailReminderScheduleDtlDTO;
import com.sams.entity.EmailReminderScheduleDtl;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.EmailReminderScheduleDtlRepository;
import com.sams.service.EmailReminderScheduleDtlService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmailReminderScheduleDtlServiceImpl implements EmailReminderScheduleDtlService {

    private final EmailReminderScheduleDtlRepository repository;

    @Override
    @Transactional
    public EmailReminderScheduleDtlDTO create(EmailReminderScheduleDtlDTO dto) {
        EmailReminderScheduleDtl entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public EmailReminderScheduleDtlDTO getById(Long id) {
        EmailReminderScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleDtl not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<EmailReminderScheduleDtlDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public EmailReminderScheduleDtlDTO update(Long id, EmailReminderScheduleDtlDTO dto) {
        EmailReminderScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleDtl not found with ID: " + id));
        EmailReminderScheduleDtl mapped = mapToEntity(dto);
        mapped.setEmailReminderScheduleDtlId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        EmailReminderScheduleDtl entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("EmailReminderScheduleDtl not found with ID: " + id));
        repository.delete(entity);
    }

    private EmailReminderScheduleDtl mapToEntity(EmailReminderScheduleDtlDTO dto) {
        EmailReminderScheduleDtl entity = new EmailReminderScheduleDtl();
        entity.setEmailReminderScheduleDtlId(dto.getEmailReminderScheduleDtlId());
        entity.setEmailReminderScheduleHdrId(dto.getEmailReminderScheduleHdrId());
        entity.setTransId(dto.getTransId());
        entity.setNumberOfDays(dto.getNumberOfDays());
        entity.setReminderType(dto.getReminderType());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private EmailReminderScheduleDtlDTO mapToDTO(EmailReminderScheduleDtl entity) {
        EmailReminderScheduleDtlDTO dto = new EmailReminderScheduleDtlDTO();
        dto.setEmailReminderScheduleDtlId(entity.getEmailReminderScheduleDtlId());
        dto.setEmailReminderScheduleHdrId(entity.getEmailReminderScheduleHdrId());
        dto.setTransId(entity.getTransId());
        dto.setNumberOfDays(entity.getNumberOfDays());
        dto.setReminderType(entity.getReminderType());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}