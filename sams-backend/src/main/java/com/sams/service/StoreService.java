package com.sams.service;

import com.sams.dto.StoreDTO;
import java.util.List;

public interface StoreService {
    StoreDTO createStore(StoreDTO dto);
    StoreDTO getStoreById(Long id);
    List<StoreDTO> getAllStores();
    StoreDTO updateStore(Long id, StoreDTO dto);
    void deleteStore(Long id);
}