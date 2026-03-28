package com.sams.service;

import com.sams.dto.VersionDTO;
import java.util.List;

public interface VersionService {
    VersionDTO create(VersionDTO dto);
    VersionDTO getById(Long id);
    List<VersionDTO> getAll();
    VersionDTO update(Long id, VersionDTO dto);
    void delete(Long id);
}