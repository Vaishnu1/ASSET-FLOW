package com.sams.service;

import com.sams.dto.CustFieldDtlDTO;
import java.util.List;

public interface CustFieldDtlService {
    CustFieldDtlDTO createCustFieldDtl(CustFieldDtlDTO dto);
    CustFieldDtlDTO getCustFieldDtlById(Long id);
    List<CustFieldDtlDTO> getAllCustFieldDtls();
    CustFieldDtlDTO updateCustFieldDtl(Long id, CustFieldDtlDTO dto);
    void deleteCustFieldDtl(Long id);
}