package com.sams.service;

import com.sams.dto.PoTcInfoDTO;
import java.util.List;

public interface PoTcInfoService {
    PoTcInfoDTO create(PoTcInfoDTO dto);
    PoTcInfoDTO getById(Long id);
    List<PoTcInfoDTO> getAll();
    PoTcInfoDTO update(Long id, PoTcInfoDTO dto);
    void delete(Long id);
}