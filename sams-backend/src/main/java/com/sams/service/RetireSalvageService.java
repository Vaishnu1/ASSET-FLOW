package com.sams.service;

import com.sams.dto.RetireSalvageDTO;
import java.util.List;

public interface RetireSalvageService {
    RetireSalvageDTO create(RetireSalvageDTO dto);
    RetireSalvageDTO getById(Long id);
    List<RetireSalvageDTO> getAll();
    RetireSalvageDTO update(Long id, RetireSalvageDTO dto);
    void delete(Long id);
}