package com.sams.service;

import com.sams.dto.CustomDisplayGroupDTO;
import java.util.List;

public interface CustomDisplayGroupService {
    CustomDisplayGroupDTO create(CustomDisplayGroupDTO dto);
    CustomDisplayGroupDTO getById(Long id);
    List<CustomDisplayGroupDTO> getAll();
    CustomDisplayGroupDTO update(Long id, CustomDisplayGroupDTO dto);
    void delete(Long id);
}