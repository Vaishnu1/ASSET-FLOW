package com.sams.service;

import com.sams.dto.PreInwAssetHdrDTO;
import java.util.List;

public interface PreInwAssetHdrService {
    PreInwAssetHdrDTO create(PreInwAssetHdrDTO dto);
    PreInwAssetHdrDTO getById(Long id);
    List<PreInwAssetHdrDTO> getAll();
    PreInwAssetHdrDTO update(Long id, PreInwAssetHdrDTO dto);
    void delete(Long id);
}