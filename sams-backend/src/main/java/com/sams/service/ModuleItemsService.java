package com.sams.service;

import com.sams.dto.ModuleItemsDTO;
import java.util.List;

public interface ModuleItemsService {
    ModuleItemsDTO create(ModuleItemsDTO dto);
    ModuleItemsDTO getById(Long id);
    List<ModuleItemsDTO> getAll();
    ModuleItemsDTO update(Long id, ModuleItemsDTO dto);
    void delete(Long id);
}