package com.sams.service;

import com.sams.dto.SrAttribute3DTO;
import java.util.List;

public interface SrAttribute3Service {
    SrAttribute3DTO create(SrAttribute3DTO dto);
    SrAttribute3DTO getById(Long id);
    List<SrAttribute3DTO> getAll();
    SrAttribute3DTO update(Long id, SrAttribute3DTO dto);
    void delete(Long id);
}