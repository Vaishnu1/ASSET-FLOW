package com.sams.service;

import com.sams.dto.InstallationTypeDTO;
import java.util.List;

public interface InstallationTypeService {
    InstallationTypeDTO create(InstallationTypeDTO dto);
    InstallationTypeDTO getById(Long id);
    List<InstallationTypeDTO> getAll();
    InstallationTypeDTO update(Long id, InstallationTypeDTO dto);
    void delete(Long id);
}