package com.sams.service.impl;

import com.sams.dto.PrinterSubCategoryMappingDTO;
import com.sams.entity.PrinterSubCategoryMapping;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrinterSubCategoryMappingRepository;
import com.sams.service.PrinterSubCategoryMappingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterSubCategoryMappingServiceImpl implements PrinterSubCategoryMappingService {

    private final PrinterSubCategoryMappingRepository repository;

    @Override
    @Transactional
    public PrinterSubCategoryMappingDTO create(PrinterSubCategoryMappingDTO dto) {
        PrinterSubCategoryMapping entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrinterSubCategoryMappingDTO getById(Long id) {
        PrinterSubCategoryMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterSubCategoryMapping not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrinterSubCategoryMappingDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrinterSubCategoryMappingDTO update(Long id, PrinterSubCategoryMappingDTO dto) {
        PrinterSubCategoryMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterSubCategoryMapping not found with ID: " + id));
        PrinterSubCategoryMapping mapped = mapToEntity(dto);
        mapped.setPrinterSubCategoryMappingId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrinterSubCategoryMapping entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterSubCategoryMapping not found with ID: " + id));
        repository.delete(entity);
    }

    private PrinterSubCategoryMapping mapToEntity(PrinterSubCategoryMappingDTO dto) {
        PrinterSubCategoryMapping entity = new PrinterSubCategoryMapping();
        entity.setPrinterSubCategoryMappingId(dto.getPrinterSubCategoryMappingId());
        entity.setAssetSubCategoryId(dto.getAssetSubCategoryId());
        entity.setPrinterModelId(dto.getPrinterModelId());
        entity.setPrinterLabelId(dto.getPrinterLabelId());
        entity.setPrinterLabelTemplateId(dto.getPrinterLabelTemplateId());
        entity.setNoOfLabels(dto.getNoOfLabels());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrinterSubCategoryMappingDTO mapToDTO(PrinterSubCategoryMapping entity) {
        PrinterSubCategoryMappingDTO dto = new PrinterSubCategoryMappingDTO();
        dto.setPrinterSubCategoryMappingId(entity.getPrinterSubCategoryMappingId());
        dto.setAssetSubCategoryId(entity.getAssetSubCategoryId());
        dto.setPrinterModelId(entity.getPrinterModelId());
        dto.setPrinterLabelId(entity.getPrinterLabelId());
        dto.setPrinterLabelTemplateId(entity.getPrinterLabelTemplateId());
        dto.setNoOfLabels(entity.getNoOfLabels());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}