package com.sams.service;

import com.sams.dto.PreInwDocumentDTO;
import java.util.List;

public interface PreInwDocumentService {
    PreInwDocumentDTO create(PreInwDocumentDTO dto);
    PreInwDocumentDTO getById(Long id);
    List<PreInwDocumentDTO> getAll();
    PreInwDocumentDTO update(Long id, PreInwDocumentDTO dto);
    void delete(Long id);
}