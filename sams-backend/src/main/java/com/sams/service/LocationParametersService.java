package com.sams.service;

import com.sams.dto.LocationParametersDTO;
import java.util.List;

public interface LocationParametersService {
    LocationParametersDTO create(LocationParametersDTO dto);
    LocationParametersDTO getById(Long id);
    List<LocationParametersDTO> getAll();
    LocationParametersDTO update(Long id, LocationParametersDTO dto);
    void delete(Long id);
}