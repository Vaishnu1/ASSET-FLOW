package com.sams.service;

import com.sams.dto.PrinterDTO;
import java.util.List;

public interface PrinterService {
    PrinterDTO create(PrinterDTO dto);
    PrinterDTO getById(Long id);
    List<PrinterDTO> getAll();
    PrinterDTO update(Long id, PrinterDTO dto);
    void delete(Long id);
}