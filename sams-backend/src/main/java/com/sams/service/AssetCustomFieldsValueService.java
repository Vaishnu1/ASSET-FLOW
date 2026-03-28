package com.sams.service;

import com.sams.dto.AssetCustomFieldsValueDTO;
import java.util.List;

public interface AssetCustomFieldsValueService {
    AssetCustomFieldsValueDTO create(AssetCustomFieldsValueDTO dto);
    AssetCustomFieldsValueDTO getById(Long id);
    List<AssetCustomFieldsValueDTO> getAll();
    AssetCustomFieldsValueDTO update(Long id, AssetCustomFieldsValueDTO dto);
    void delete(Long id);
}