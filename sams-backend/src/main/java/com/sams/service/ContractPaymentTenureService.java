package com.sams.service;

import com.sams.dto.ContractPaymentTenureDTO;
import java.util.List;

public interface ContractPaymentTenureService {
    ContractPaymentTenureDTO create(ContractPaymentTenureDTO dto);
    ContractPaymentTenureDTO getById(Long id);
    List<ContractPaymentTenureDTO> getAll();
    ContractPaymentTenureDTO update(Long id, ContractPaymentTenureDTO dto);
    void delete(Long id);
}