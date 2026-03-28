package com.sams.service;

import com.sams.dto.ModulesDTO;
import java.util.List;

public interface ModulesService {
    ModulesDTO create(ModulesDTO dto);
    ModulesDTO getById(Long id);
    List<ModulesDTO> getAll();
    ModulesDTO update(Long id, ModulesDTO dto);
    void delete(Long id);
}