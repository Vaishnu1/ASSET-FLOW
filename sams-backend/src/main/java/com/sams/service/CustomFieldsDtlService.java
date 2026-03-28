package com.sams.service;

import com.sams.dto.CustomFieldsDtlDTO;
import java.util.List;

public interface CustomFieldsDtlService {
    CustomFieldsDtlDTO create(CustomFieldsDtlDTO dto);
    CustomFieldsDtlDTO getById(Long id);
    List<CustomFieldsDtlDTO> getAll();
    CustomFieldsDtlDTO update(Long id, CustomFieldsDtlDTO dto);
    void delete(Long id);
}