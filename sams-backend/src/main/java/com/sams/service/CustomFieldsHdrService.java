package com.sams.service;

import com.sams.dto.CustomFieldsHdrDTO;
import java.util.List;

public interface CustomFieldsHdrService {
    CustomFieldsHdrDTO create(CustomFieldsHdrDTO dto);
    CustomFieldsHdrDTO getById(Long id);
    List<CustomFieldsHdrDTO> getAll();
    CustomFieldsHdrDTO update(Long id, CustomFieldsHdrDTO dto);
    void delete(Long id);
}