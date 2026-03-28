package com.sams.service;

import com.sams.dto.ItemTransactionsDTO;
import java.util.List;

public interface ItemTransactionsService {
    ItemTransactionsDTO create(ItemTransactionsDTO dto);
    ItemTransactionsDTO getById(Long id);
    List<ItemTransactionsDTO> getAll();
    ItemTransactionsDTO update(Long id, ItemTransactionsDTO dto);
    void delete(Long id);
}