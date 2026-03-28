package com.sams.service;

import com.sams.dto.LocationDTO;
import java.util.List;

public interface LocationService {
    LocationDTO create(LocationDTO dto);
    LocationDTO getById(Long id);
    List<LocationDTO> getAll();
    LocationDTO update(Long id, LocationDTO dto);
    void delete(Long id);
}