package com.sams.service;

import com.sams.dto.AssetSwDtlDTO;
import java.util.List;

public interface AssetSwDtlService {
    AssetSwDtlDTO create(AssetSwDtlDTO dto);
    AssetSwDtlDTO getById(Long id);
    List<AssetSwDtlDTO> getAll();
    AssetSwDtlDTO update(Long id, AssetSwDtlDTO dto);
    void delete(Long id);
}