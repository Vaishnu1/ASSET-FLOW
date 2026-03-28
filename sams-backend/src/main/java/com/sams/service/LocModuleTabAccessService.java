package com.sams.service;

import com.sams.dto.LocModuleTabAccessDTO;
import java.util.List;

public interface LocModuleTabAccessService {
    LocModuleTabAccessDTO create(LocModuleTabAccessDTO dto);
    LocModuleTabAccessDTO getById(Long id);
    List<LocModuleTabAccessDTO> getAll();
    LocModuleTabAccessDTO update(Long id, LocModuleTabAccessDTO dto);
    void delete(Long id);
}