package com.sams.service;

import com.sams.dto.VolumeLicenseDTO;
import java.util.List;

public interface VolumeLicenseService {
    VolumeLicenseDTO create(VolumeLicenseDTO dto);
    VolumeLicenseDTO getById(Long id);
    List<VolumeLicenseDTO> getAll();
    VolumeLicenseDTO update(Long id, VolumeLicenseDTO dto);
    void delete(Long id);
}