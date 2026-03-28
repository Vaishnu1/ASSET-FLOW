package com.sams.service;

import com.sams.dto.AssetAssigneeDTO;
import java.util.List;

public interface AssetAssigneeService {
    AssetAssigneeDTO createAssetAssignee(AssetAssigneeDTO dto);
    AssetAssigneeDTO getAssetAssigneeById(Long id);
    List<AssetAssigneeDTO> getAllAssetAssignees();
    AssetAssigneeDTO updateAssetAssignee(Long id, AssetAssigneeDTO dto);
    void deleteAssetAssignee(Long id);
}