package com.sams.service;

import com.sams.dto.ItemRegisterDTO;
import java.util.List;

public interface ItemRegisterService {
    ItemRegisterDTO create(ItemRegisterDTO dto);
    ItemRegisterDTO getById(Long id);
    List<ItemRegisterDTO> getAll();
    ItemRegisterDTO update(Long id, ItemRegisterDTO dto);
    void delete(Long id);
}