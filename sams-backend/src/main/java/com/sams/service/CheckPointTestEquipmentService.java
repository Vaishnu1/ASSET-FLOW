package com.sams.service;

import com.sams.dto.CheckPointTestEquipmentDTO;
import java.util.List;

public interface CheckPointTestEquipmentService {
    CheckPointTestEquipmentDTO create(CheckPointTestEquipmentDTO dto);
    CheckPointTestEquipmentDTO getById(Long id);
    List<CheckPointTestEquipmentDTO> getAll();
    CheckPointTestEquipmentDTO update(Long id, CheckPointTestEquipmentDTO dto);
    void delete(Long id);
}