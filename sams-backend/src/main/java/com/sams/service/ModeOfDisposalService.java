package com.sams.service;

import com.sams.dto.ModeOfDisposalDTO;
import java.util.List;

public interface ModeOfDisposalService {
    ModeOfDisposalDTO create(ModeOfDisposalDTO dto);
    ModeOfDisposalDTO getById(Long id);
    List<ModeOfDisposalDTO> getAll();
    ModeOfDisposalDTO update(Long id, ModeOfDisposalDTO dto);
    void delete(Long id);
}