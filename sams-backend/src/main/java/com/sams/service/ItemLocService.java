package com.sams.service;

import com.sams.dto.ItemLocDTO;
import java.util.List;

public interface ItemLocService {
    ItemLocDTO create(ItemLocDTO dto);
    ItemLocDTO getById(Long id);
    List<ItemLocDTO> getAll();
    ItemLocDTO update(Long id, ItemLocDTO dto);
    void delete(Long id);
}