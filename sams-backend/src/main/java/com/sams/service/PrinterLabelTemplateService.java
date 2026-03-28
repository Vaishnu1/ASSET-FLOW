package com.sams.service;

import com.sams.dto.PrinterLabelTemplateDTO;
import java.util.List;

public interface PrinterLabelTemplateService {
    PrinterLabelTemplateDTO create(PrinterLabelTemplateDTO dto);
    PrinterLabelTemplateDTO getById(Long id);
    List<PrinterLabelTemplateDTO> getAll();
    PrinterLabelTemplateDTO update(Long id, PrinterLabelTemplateDTO dto);
    void delete(Long id);
}