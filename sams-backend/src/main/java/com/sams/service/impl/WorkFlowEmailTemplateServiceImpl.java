package com.sams.service.impl;

import com.sams.dto.WorkFlowEmailTemplateDTO;
import com.sams.entity.WorkFlowEmailTemplate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.WorkFlowEmailTemplateRepository;
import com.sams.service.WorkFlowEmailTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkFlowEmailTemplateServiceImpl implements WorkFlowEmailTemplateService {

    private final WorkFlowEmailTemplateRepository repository;

    @Override
    @Transactional
    public WorkFlowEmailTemplateDTO create(WorkFlowEmailTemplateDTO dto) {
        WorkFlowEmailTemplate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public WorkFlowEmailTemplateDTO getById(Long id) {
        WorkFlowEmailTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowEmailTemplate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<WorkFlowEmailTemplateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public WorkFlowEmailTemplateDTO update(Long id, WorkFlowEmailTemplateDTO dto) {
        WorkFlowEmailTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowEmailTemplate not found with ID: " + id));
        WorkFlowEmailTemplate mapped = mapToEntity(dto);
        mapped.setWfEmailTemplateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        WorkFlowEmailTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("WorkFlowEmailTemplate not found with ID: " + id));
        repository.delete(entity);
    }

    private WorkFlowEmailTemplate mapToEntity(WorkFlowEmailTemplateDTO dto) {
        WorkFlowEmailTemplate entity = new WorkFlowEmailTemplate();
        entity.setWfEmailTemplateId(dto.getWfEmailTemplateId());
        entity.setOrgId(dto.getOrgId());
        entity.setProcessId(dto.getProcessId());
        entity.setEmailTemplateName(dto.getEmailTemplateName());
        entity.setEmailSubject(dto.getEmailSubject());
        entity.setEmailBody(dto.getEmailBody());
        entity.setEmailFooter(dto.getEmailFooter());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private WorkFlowEmailTemplateDTO mapToDTO(WorkFlowEmailTemplate entity) {
        WorkFlowEmailTemplateDTO dto = new WorkFlowEmailTemplateDTO();
        dto.setWfEmailTemplateId(entity.getWfEmailTemplateId());
        dto.setOrgId(entity.getOrgId());
        dto.setProcessId(entity.getProcessId());
        dto.setEmailTemplateName(entity.getEmailTemplateName());
        dto.setEmailSubject(entity.getEmailSubject());
        dto.setEmailBody(entity.getEmailBody());
        dto.setEmailFooter(entity.getEmailFooter());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}