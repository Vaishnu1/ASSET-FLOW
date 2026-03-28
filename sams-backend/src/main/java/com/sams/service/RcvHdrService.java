package com.sams.service;

import com.sams.dto.RcvHdrDTO;
import java.util.List;

public interface RcvHdrService {
    RcvHdrDTO create(RcvHdrDTO dto);
    RcvHdrDTO getById(Long id);
    List<RcvHdrDTO> getAll();
    RcvHdrDTO update(Long id, RcvHdrDTO dto);
    void delete(Long id);
}