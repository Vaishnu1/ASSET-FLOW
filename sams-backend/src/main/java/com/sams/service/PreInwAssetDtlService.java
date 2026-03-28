package com.sams.service;

import com.sams.dto.PreInwAssetDtlDTO;
import java.util.List;

public interface PreInwAssetDtlService {
    PreInwAssetDtlDTO create(PreInwAssetDtlDTO dto);
    PreInwAssetDtlDTO getById(Long id);
    List<PreInwAssetDtlDTO> getAll();
    PreInwAssetDtlDTO update(Long id, PreInwAssetDtlDTO dto);
    void delete(Long id);
}