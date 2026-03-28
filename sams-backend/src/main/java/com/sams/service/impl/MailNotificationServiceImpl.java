package com.sams.service.impl;

import com.sams.dto.MailNotificationDTO;
import com.sams.entity.MailNotification;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.MailNotificationRepository;
import com.sams.service.MailNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MailNotificationServiceImpl implements MailNotificationService {

    private final MailNotificationRepository repository;

    @Override
    @Transactional
    public MailNotificationDTO createMailNotification(MailNotificationDTO dto) {
        MailNotification entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public MailNotificationDTO getMailNotificationById(Long id) {
        MailNotification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MailNotification not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<MailNotificationDTO> getAllMailNotifications() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public MailNotificationDTO updateMailNotification(Long id, MailNotificationDTO dto) {
        MailNotification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MailNotification not found with ID: " + id));
        // Default quick update implementation (normally map fields here)
        MailNotification mapped = mapToEntity(dto);
        mapped.setId(id);
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void deleteMailNotification(Long id) {
        MailNotification entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("MailNotification not found with ID: " + id));
        repository.delete(entity);
    }

    private MailNotification mapToEntity(MailNotificationDTO dto) {
        MailNotification entity = new MailNotification();
        entity.setMailNotificationId(dto.getMailNotificationId());
        entity.setMainProcessId(dto.getMainProcessId());
        entity.setSubProcessId(dto.getSubProcessId());
        entity.setSubProcessName(dto.getSubProcessName());
        entity.setMainProcessName(dto.getMainProcessName());
        entity.setToEmail(dto.getToEmail());
        entity.setCcEmail(dto.getCcEmail());
        entity.setBccEmail(dto.getBccEmail());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setActive(dto.getActive());
        entity.setActiveDisp(dto.getActiveDisp());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDtDisp(dto.getCreatedDtDisp());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDtDisp(dto.getUpdatedDtDisp());
        entity.setOrgName(dto.getOrgName());
        entity.setLocationName(dto.getLocationName());
        return entity;
    }

    private MailNotificationDTO mapToDTO(MailNotification entity) {
        MailNotificationDTO dto = new MailNotificationDTO();
        dto.setId(entity.getId());
        dto.setMailNotificationId(entity.getMailNotificationId());
        dto.setMainProcessId(entity.getMainProcessId());
        dto.setSubProcessId(entity.getSubProcessId());
        dto.setSubProcessName(entity.getSubProcessName());
        dto.setMainProcessName(entity.getMainProcessName());
        dto.setToEmail(entity.getToEmail());
        dto.setCcEmail(entity.getCcEmail());
        dto.setBccEmail(entity.getBccEmail());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setActive(entity.getActive());
        dto.setActiveDisp(entity.getActiveDisp());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDtDisp(entity.getCreatedDtDisp());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDtDisp(entity.getUpdatedDtDisp());
        dto.setOrgName(entity.getOrgName());
        dto.setLocationName(entity.getLocationName());
        return dto;
    }
}