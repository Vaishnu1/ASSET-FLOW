package com.sams.service;

import com.sams.dto.PrinterLabelSizeDTO;
import java.util.List;

public interface PrinterLabelSizeService {
    PrinterLabelSizeDTO create(PrinterLabelSizeDTO dto);
    PrinterLabelSizeDTO getById(Long id);
    List<PrinterLabelSizeDTO> getAll();
    PrinterLabelSizeDTO update(Long id, PrinterLabelSizeDTO dto);
    void delete(Long id);
}