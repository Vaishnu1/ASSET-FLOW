package com.sams.service;

import com.sams.dto.StoreLocAccessDTO;
import java.util.List;

public interface StoreLocAccessService {
    StoreLocAccessDTO create(StoreLocAccessDTO dto);
    StoreLocAccessDTO getById(Long id);
    List<StoreLocAccessDTO> getAll();
    StoreLocAccessDTO update(Long id, StoreLocAccessDTO dto);
    void delete(Long id);
}