package com.sams.service;

import com.sams.dto.DispSeqNoDTO;
import java.util.List;

public interface DispSeqNoService {
    DispSeqNoDTO create(DispSeqNoDTO dto);
    DispSeqNoDTO getById(Long id);
    List<DispSeqNoDTO> getAll();
    DispSeqNoDTO update(Long id, DispSeqNoDTO dto);
    void delete(Long id);
}