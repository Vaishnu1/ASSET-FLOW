package com.sams.service;

import com.sams.dto.PurchaseTcParametersDTO;
import java.util.List;

public interface PurchaseTcParametersService {
    PurchaseTcParametersDTO create(PurchaseTcParametersDTO dto);
    PurchaseTcParametersDTO getById(Long id);
    List<PurchaseTcParametersDTO> getAll();
    PurchaseTcParametersDTO update(Long id, PurchaseTcParametersDTO dto);
    void delete(Long id);
}