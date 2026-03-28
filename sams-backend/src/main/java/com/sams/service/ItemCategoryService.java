package com.sams.service;

import com.sams.dto.ItemCategoryDTO;
import java.util.List;

public interface ItemCategoryService {
    ItemCategoryDTO createItemCategory(ItemCategoryDTO dto);
    ItemCategoryDTO getItemCategoryById(Long id);
    List<ItemCategoryDTO> getAllItemCategories();
    ItemCategoryDTO updateItemCategory(Long id, ItemCategoryDTO dto);
    void deleteItemCategory(Long id);
}