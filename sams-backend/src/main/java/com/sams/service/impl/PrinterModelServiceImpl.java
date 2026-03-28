package com.sams.service.impl;

import com.sams.dto.PrinterModelDTO;
import com.sams.entity.PrinterModel;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrinterModelRepository;
import com.sams.service.PrinterModelService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterModelServiceImpl implements PrinterModelService {

    private final PrinterModelRepository repository;

    @Override
    @Transactional
    public PrinterModelDTO create(PrinterModelDTO dto) {
        PrinterModel entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrinterModelDTO getById(Long id) {
        PrinterModel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterModel not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrinterModelDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrinterModelDTO update(Long id, PrinterModelDTO dto) {
        PrinterModel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterModel not found with ID: " + id));
        PrinterModel mapped = mapToEntity(dto);
        mapped.setPrinterModelId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrinterModel entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterModel not found with ID: " + id));
        repository.delete(entity);
    }

    private PrinterModel mapToEntity(PrinterModelDTO dto) {
        PrinterModel entity = new PrinterModel();
        entity.setPrinterModelId(dto.getPrinterModelId());
        entity.setOrgId(dto.getOrgId());
        entity.setPrinterManufacturer(dto.getPrinterManufacturer());
        entity.setPrinterModel(dto.getPrinterModel());
        entity.setDefaultModel(dto.getDefaultModel());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrinterModelDTO mapToDTO(PrinterModel entity) {
        PrinterModelDTO dto = new PrinterModelDTO();
        dto.setPrinterModelId(entity.getPrinterModelId());
        dto.setOrgId(entity.getOrgId());
        dto.setPrinterManufacturer(entity.getPrinterManufacturer());
        dto.setPrinterModel(entity.getPrinterModel());
        dto.setDefaultModel(entity.getDefaultModel());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}