package com.sams.service;

import com.sams.dto.departmentDtlDTO;
import java.util.List;

public interface departmentDtlService {
    departmentDtlDTO createdepartmentDtl(departmentDtlDTO dto);
    departmentDtlDTO getdepartmentDtlById(Long id);
    List<departmentDtlDTO> getAlldepartmentDtls();
    departmentDtlDTO updatedepartmentDtl(Long id, departmentDtlDTO dto);
    void deletedepartmentDtl(Long id);
}