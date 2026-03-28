package com.sams.service;

import com.sams.dto.RetireBuyBackDTO;
import java.util.List;

public interface RetireBuyBackService {
    RetireBuyBackDTO create(RetireBuyBackDTO dto);
    RetireBuyBackDTO getById(Long id);
    List<RetireBuyBackDTO> getAll();
    RetireBuyBackDTO update(Long id, RetireBuyBackDTO dto);
    void delete(Long id);
}