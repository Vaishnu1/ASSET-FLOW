package com.sams.service;

import com.sams.dto.PrinterSubCategoryMappingDTO;
import java.util.List;

public interface PrinterSubCategoryMappingService {
    PrinterSubCategoryMappingDTO create(PrinterSubCategoryMappingDTO dto);
    PrinterSubCategoryMappingDTO getById(Long id);
    List<PrinterSubCategoryMappingDTO> getAll();
    PrinterSubCategoryMappingDTO update(Long id, PrinterSubCategoryMappingDTO dto);
    void delete(Long id);
}