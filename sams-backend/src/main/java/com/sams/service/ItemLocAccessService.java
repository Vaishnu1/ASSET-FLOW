package com.sams.service;

import com.sams.dto.ItemLocAccessDTO;
import java.util.List;

public interface ItemLocAccessService {
    ItemLocAccessDTO create(ItemLocAccessDTO dto);
    ItemLocAccessDTO getById(Long id);
    List<ItemLocAccessDTO> getAll();
    ItemLocAccessDTO update(Long id, ItemLocAccessDTO dto);
    void delete(Long id);
}