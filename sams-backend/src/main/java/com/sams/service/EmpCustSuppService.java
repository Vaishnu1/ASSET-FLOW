package com.sams.service;

import com.sams.dto.EmpCustSuppDTO;
import java.util.List;

public interface EmpCustSuppService {
    EmpCustSuppDTO createEmpCustSupp(EmpCustSuppDTO dto);
    EmpCustSuppDTO getEmpCustSuppById(Long id);
    List<EmpCustSuppDTO> getAllEmpCustSupps();
    EmpCustSuppDTO updateEmpCustSupp(Long id, EmpCustSuppDTO dto);
    void deleteEmpCustSupp(Long id);
}