package com.sams.service;

import com.sams.dto.PrinterModelDTO;
import java.util.List;

public interface PrinterModelService {
    PrinterModelDTO create(PrinterModelDTO dto);
    PrinterModelDTO getById(Long id);
    List<PrinterModelDTO> getAll();
    PrinterModelDTO update(Long id, PrinterModelDTO dto);
    void delete(Long id);
}