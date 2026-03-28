package com.sams.service;

import com.sams.dto.AccConDTO;
import java.util.List;

public interface AccConService {
    AccConDTO createAccCon(AccConDTO dto);
    AccConDTO getAccConById(Long id);
    List<AccConDTO> getAllAccCons();
    AccConDTO updateAccCon(Long id, AccConDTO dto);
    void deleteAccCon(Long id);
}