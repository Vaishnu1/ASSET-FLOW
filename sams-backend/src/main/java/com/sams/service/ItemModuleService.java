package com.sams.service;

import com.sams.dto.ItemModuleDTO;
import java.util.List;

public interface ItemModuleService {
    ItemModuleDTO create(ItemModuleDTO dto);
    ItemModuleDTO getById(Long id);
    List<ItemModuleDTO> getAll();
    ItemModuleDTO update(Long id, ItemModuleDTO dto);
    void delete(Long id);
}