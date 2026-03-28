package com.sams.service.impl;

import com.sams.dto.PrinterDTO;
import com.sams.entity.Printer;
import com.sams.exception.ResourceNotFoundException;
import com.sams.repository.PrinterRepository;
import com.sams.service.PrinterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PrinterServiceImpl implements PrinterService {

    private final PrinterRepository repository;

    @Override
    @Transactional
    public PrinterDTO create(PrinterDTO dto) {
        Printer entity = mapToEntity(dto);
        return mapToDTO(repository.save(entity));
    }

    @Override
    public PrinterDTO getById(Long id) {
        Printer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Printer not found with ID: " + id));
        return mapToDTO(entity);
    }

    @Override
    public List<PrinterDTO> getAll() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PrinterDTO update(Long id, PrinterDTO dto) {
        Printer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Printer not found with ID: " + id));
        Printer mapped = mapToEntity(dto);
        mapped.setPrinterId(id); // Assuming first field is ID
        return mapToDTO(repository.save(mapped));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Printer entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Printer not found with ID: " + id));
        repository.delete(entity);
    }

    private Printer mapToEntity(PrinterDTO dto) {
        Printer entity = new Printer();
        entity.setPrinterId(dto.getPrinterId());
        entity.setOrgId(dto.getOrgId());
        entity.setLocationId(dto.getLocationId());
        entity.setPrinterName(dto.getPrinterName());
        entity.setPrinterModelId(dto.getPrinterModelId());
        entity.setPrinterModel(dto.getPrinterModel());
        entity.setPrinterManufacturer(dto.getPrinterManufacturer());
        entity.setCommunicationType(dto.getCommunicationType());
        entity.setDefaultPrinter(dto.getDefaultPrinter());
        entity.setActive(dto.getActive());
        entity.setCreatedBy(dto.getCreatedBy());
        entity.setCreatedDt(dto.getCreatedDt());
        entity.setUpdatedBy(dto.getUpdatedBy());
        entity.setUpdatedDt(dto.getUpdatedDt());
        return entity;
    }

    private PrinterDTO mapToDTO(Printer entity) {
        PrinterDTO dto = new PrinterDTO();
        dto.setPrinterId(entity.getPrinterId());
        dto.setOrgId(entity.getOrgId());
        dto.setLocationId(entity.getLocationId());
        dto.setPrinterName(entity.getPrinterName());
        dto.setPrinterModelId(entity.getPrinterModelId());
        dto.setPrinterModel(entity.getPrinterModel());
        dto.setPrinterManufacturer(entity.getPrinterManufacturer());
        dto.setCommunicationType(entity.getCommunicationType());
        dto.setDefaultPrinter(entity.getDefaultPrinter());
        dto.setActive(entity.getActive());
        dto.setCreatedBy(entity.getCreatedBy());
        dto.setCreatedDt(entity.getCreatedDt());
        dto.setUpdatedBy(entity.getUpdatedBy());
        dto.setUpdatedDt(entity.getUpdatedDt());
        return dto;
    }
}