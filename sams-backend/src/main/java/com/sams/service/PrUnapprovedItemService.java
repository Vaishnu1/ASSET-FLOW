package com.sams.service;

import com.sams.dto.PrUnapprovedItemDTO;
import java.util.List;

public interface PrUnapprovedItemService {
    PrUnapprovedItemDTO create(PrUnapprovedItemDTO dto);
    PrUnapprovedItemDTO getById(Long id);
    List<PrUnapprovedItemDTO> getAll();
    PrUnapprovedItemDTO update(Long id, PrUnapprovedItemDTO dto);
    void delete(Long id);
}