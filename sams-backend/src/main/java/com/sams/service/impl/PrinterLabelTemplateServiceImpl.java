package com.sams.service.impl;

import com.sams.dto.PrinterLabelTemplateDTO;
import com.sams.entity.PrinterLabelTemplate;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrinterLabelTemplateRepository;
import com.sams.service.PrinterLabelTemplateService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterLabelTemplateServiceImpl implements PrinterLabelTemplateService {

    private final PrinterLabelTemplateRepository repository;

    @Override
    @Transactional
    public PrinterLabelTemplateDTO create(PrinterLabelTemplateDTO dto) {
        PrinterLabelTemplate entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrinterLabelTemplateDTO getById(Long id) {
        PrinterLabelTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelTemplate not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrinterLabelTemplateDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrinterLabelTemplateDTO update(Long id, PrinterLabelTemplateDTO dto) {
        PrinterLabelTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelTemplate not found with ID: " + id));
        PrinterLabelTemplate mapped = mapToEntity(dto);
        mapped.setPrinterLabelTemplateId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrinterLabelTemplate entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelTemplate not found with ID: " + id));
        repository.delete(entity);
    }

    private PrinterLabelTemplate mapToEntity(PrinterLabelTemplateDTO dto) {
        PrinterLabelTemplate entity = new PrinterLabelTemplate();
        entity.setPrinterLabelTemplateId(dto.getPrinterLabelTemplateId());
        entity.setPrinterModelId(dto.getPrinterModelId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setPrinterLabelId(dto.getPrinterLabelId());
        entity.setTemplateName(dto.getTemplateName());
        entity.setFileName(dto.getFileName());
        entity.setTemplatePath(dto.getTemplatePath());
        entity.setFileType(dto.getFileType());
        entity.setDefaultTemplate(dto.getDefaultTemplate());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrinterLabelTemplateDTO mapToDTO(PrinterLabelTemplate entity) {
        PrinterLabelTemplateDTO dto = new PrinterLabelTemplateDTO();
        dto.setPrinterLabelTemplateId(entity.getPrinterLabelTemplateId());
        dto.setPrinterModelId(entity.getPrinterModelId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setPrinterLabelId(entity.getPrinterLabelId());
        dto.setTemplateName(entity.getTemplateName());
        dto.setFileName(entity.getFileName());
        dto.setTemplatePath(entity.getTemplatePath());
        dto.setFileType(entity.getFileType());
        dto.setDefaultTemplate(entity.getDefaultTemplate());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}