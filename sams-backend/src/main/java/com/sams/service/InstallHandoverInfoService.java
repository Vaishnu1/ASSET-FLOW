package com.sams.service;

import com.sams.dto.InstallHandoverInfoDTO;
import java.util.List;

public interface InstallHandoverInfoService {
    InstallHandoverInfoDTO create(InstallHandoverInfoDTO dto);
    InstallHandoverInfoDTO getById(Long id);
    List<InstallHandoverInfoDTO> getAll();
    InstallHandoverInfoDTO update(Long id, InstallHandoverInfoDTO dto);
    void delete(Long id);
}