package com.sams.service;

import com.sams.dto.ItemManufacturerDTO;
import java.util.List;

public interface ItemManufacturerService {
    ItemManufacturerDTO create(ItemManufacturerDTO dto);
    ItemManufacturerDTO getById(Long id);
    List<ItemManufacturerDTO> getAll();
    ItemManufacturerDTO update(Long id, ItemManufacturerDTO dto);
    void delete(Long id);
}