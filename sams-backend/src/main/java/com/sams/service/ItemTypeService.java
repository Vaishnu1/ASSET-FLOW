package com.sams.service;

import com.sams.dto.ItemTypeDTO;
import java.util.List;

public interface ItemTypeService {
    ItemTypeDTO createItemType(ItemTypeDTO dto);
    ItemTypeDTO getItemTypeById(Long id);
    List<ItemTypeDTO> getAllItemTypes();
    ItemTypeDTO updateItemType(Long id, ItemTypeDTO dto);
    void deleteItemType(Long id);
}