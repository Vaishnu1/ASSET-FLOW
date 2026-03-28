package com.sams.service;

import com.sams.dto.AssetTemporaryAssigneeDTO;
import java.util.List;

public interface AssetTemporaryAssigneeService {
    AssetTemporaryAssigneeDTO create(AssetTemporaryAssigneeDTO dto);
    AssetTemporaryAssigneeDTO getById(Long id);
    List<AssetTemporaryAssigneeDTO> getAll();
    AssetTemporaryAssigneeDTO update(Long id, AssetTemporaryAssigneeDTO dto);
    void delete(Long id);
}