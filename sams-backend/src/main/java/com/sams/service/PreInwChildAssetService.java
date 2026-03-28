package com.sams.service;

import com.sams.dto.PreInwChildAssetDTO;
import java.util.List;

public interface PreInwChildAssetService {
    PreInwChildAssetDTO create(PreInwChildAssetDTO dto);
    PreInwChildAssetDTO getById(Long id);
    List<PreInwChildAssetDTO> getAll();
    PreInwChildAssetDTO update(Long id, PreInwChildAssetDTO dto);
    void delete(Long id);
}