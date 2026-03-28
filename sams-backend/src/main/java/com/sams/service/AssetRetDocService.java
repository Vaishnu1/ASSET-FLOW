package com.sams.service;

import com.sams.dto.AssetRetDocDTO;
import java.util.List;

public interface AssetRetDocService {
    AssetRetDocDTO create(AssetRetDocDTO dto);
    AssetRetDocDTO getById(Long id);
    List<AssetRetDocDTO> getAll();
    AssetRetDocDTO update(Long id, AssetRetDocDTO dto);
    void delete(Long id);
}