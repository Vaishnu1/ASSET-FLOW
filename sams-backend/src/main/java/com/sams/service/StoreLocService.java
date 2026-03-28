package com.sams.service;

import com.sams.dto.StoreLocDTO;
import java.util.List;

public interface StoreLocService {
    StoreLocDTO createStoreLoc(StoreLocDTO dto);
    StoreLocDTO getStoreLocById(Long id);
    List<StoreLocDTO> getAllStoreLocs();
    StoreLocDTO updateStoreLoc(Long id, StoreLocDTO dto);
    void deleteStoreLoc(Long id);
}