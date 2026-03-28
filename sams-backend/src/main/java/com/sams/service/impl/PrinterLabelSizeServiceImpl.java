package com.sams.service.impl;

import com.sams.dto.PrinterLabelSizeDTO;
import com.sams.entity.PrinterLabelSize;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrinterLabelSizeRepository;
import com.sams.service.PrinterLabelSizeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterLabelSizeServiceImpl implements PrinterLabelSizeService {

    private final PrinterLabelSizeRepository repository;

    @Override
    @Transactional
    public PrinterLabelSizeDTO create(PrinterLabelSizeDTO dto) {
        PrinterLabelSize entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrinterLabelSizeDTO getById(Long id) {
        PrinterLabelSize entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelSize not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrinterLabelSizeDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrinterLabelSizeDTO update(Long id, PrinterLabelSizeDTO dto) {
        PrinterLabelSize entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelSize not found with ID: " + id));
        PrinterLabelSize mapped = mapToEntity(dto);
        mapped.setPrinterLabelId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        PrinterLabelSize entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("PrinterLabelSize not found with ID: " + id));
        repository.delete(entity);
    }

    private PrinterLabelSize mapToEntity(PrinterLabelSizeDTO dto) {
        PrinterLabelSize entity = new PrinterLabelSize();
        entity.setPrinterLabelId(dto.getPrinterLabelId());
        entity.setPrinterModelId(dto.getPrinterModelId());
        entity.setLabelSize(dto.getLabelSize());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrinterLabelSizeDTO mapToDTO(PrinterLabelSize entity) {
        PrinterLabelSizeDTO dto = new PrinterLabelSizeDTO();
        dto.setPrinterLabelId(entity.getPrinterLabelId());
        dto.setPrinterModelId(entity.getPrinterModelId());
        dto.setLabelSize(entity.getLabelSize());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}