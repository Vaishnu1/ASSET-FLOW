package com.sams.service;

import com.sams.dto.SourcingTypesDTO;
import java.util.List;

public interface SourcingTypesService {
    SourcingTypesDTO create(SourcingTypesDTO dto);
    SourcingTypesDTO getById(Long id);
    List<SourcingTypesDTO> getAll();
    SourcingTypesDTO update(Long id, SourcingTypesDTO dto);
    void delete(Long id);
}