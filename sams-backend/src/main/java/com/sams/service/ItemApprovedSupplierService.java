package com.sams.service;

import com.sams.dto.ItemApprovedSupplierDTO;
import java.util.List;

public interface ItemApprovedSupplierService {
    ItemApprovedSupplierDTO createItemApprovedSupplier(ItemApprovedSupplierDTO dto);
    ItemApprovedSupplierDTO getItemApprovedSupplierById(Long id);
    List<ItemApprovedSupplierDTO> getAllItemApprovedSuppliers();
    ItemApprovedSupplierDTO updateItemApprovedSupplier(Long id, ItemApprovedSupplierDTO dto);
    void deleteItemApprovedSupplier(Long id);
}