package com.sams.service;

import com.sams.dto.CusFieldHdrDTO;
import java.util.List;

public interface CusFieldHdrService {
    CusFieldHdrDTO createCusFieldHdr(CusFieldHdrDTO dto);
    CusFieldHdrDTO getCusFieldHdrById(Long id);
    List<CusFieldHdrDTO> getAllCusFieldHdrs();
    CusFieldHdrDTO updateCusFieldHdr(Long id, CusFieldHdrDTO dto);
    void deleteCusFieldHdr(Long id);
}