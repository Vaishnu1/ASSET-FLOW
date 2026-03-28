package com.sams.service;

import com.sams.dto.ChildAssetDTO;
import java.util.List;

public interface ChildAssetService {
    ChildAssetDTO create(ChildAssetDTO dto);
    ChildAssetDTO getById(Long id);
    List<ChildAssetDTO> getAll();
    ChildAssetDTO update(Long id, ChildAssetDTO dto);
    void delete(Long id);
}