package com.sams.service;

import com.sams.dto.ItemPurchasePriceDTO;
import java.util.List;

public interface ItemPurchasePriceService {
    ItemPurchasePriceDTO create(ItemPurchasePriceDTO dto);
    ItemPurchasePriceDTO getById(Long id);
    List<ItemPurchasePriceDTO> getAll();
    ItemPurchasePriceDTO update(Long id, ItemPurchasePriceDTO dto);
    void delete(Long id);
}