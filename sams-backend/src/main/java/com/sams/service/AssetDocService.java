package com.sams.service;

import com.sams.dto.AssetDocDTO;
import java.util.List;

public interface AssetDocService {
    AssetDocDTO create(AssetDocDTO dto);
    AssetDocDTO getById(Long id);
    List<AssetDocDTO> getAll();
    AssetDocDTO update(Long id, AssetDocDTO dto);
    void delete(Long id);
}