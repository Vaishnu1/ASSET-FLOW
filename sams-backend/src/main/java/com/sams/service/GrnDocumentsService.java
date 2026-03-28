package com.sams.service;

import com.sams.dto.GrnDocumentsDTO;
import java.util.List;

public interface GrnDocumentsService {
    GrnDocumentsDTO create(GrnDocumentsDTO dto);
    GrnDocumentsDTO getById(Long id);
    List<GrnDocumentsDTO> getAll();
    GrnDocumentsDTO update(Long id, GrnDocumentsDTO dto);
    void delete(Long id);
}