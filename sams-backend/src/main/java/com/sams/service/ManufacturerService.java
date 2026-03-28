package com.sams.service;

import com.sams.dto.ManufacturerDTO;
import java.util.List;

public interface ManufacturerService {
    ManufacturerDTO createManufacturer(ManufacturerDTO dto);
    ManufacturerDTO getManufacturerById(Long id);
    List<ManufacturerDTO> getAllManufacturers();
    ManufacturerDTO updateManufacturer(Long id, ManufacturerDTO dto);
    void deleteManufacturer(Long id);
}