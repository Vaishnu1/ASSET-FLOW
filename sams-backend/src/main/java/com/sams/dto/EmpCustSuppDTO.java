package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmpCustSuppDTO {
    private Long id;
    private Long custSuppEmpId;
    private String custSuppEmpName;
    private String custSuppEmpEmailId;
    private String custSuppEmpContactNo;
    private String custSuppEmpCode;
}