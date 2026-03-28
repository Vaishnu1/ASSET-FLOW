package com.sams.service;

import com.sams.dto.ItemBranchMappingDTO;
import java.util.List;

public interface ItemBranchMappingService {
    ItemBranchMappingDTO create(ItemBranchMappingDTO dto);
    ItemBranchMappingDTO getById(Long id);
    List<ItemBranchMappingDTO> getAll();
    ItemBranchMappingDTO update(Long id, ItemBranchMappingDTO dto);
    void delete(Long id);
}