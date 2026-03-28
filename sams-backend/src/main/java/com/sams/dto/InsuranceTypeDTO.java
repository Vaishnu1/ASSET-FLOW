package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InsuranceTypeDTO {
    private Long insuranceTypeId;
    private Long orgId;
    private String insuranceTypeName;
    private String insuranceTypeDesc;
    private String insuranceTypeFor;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}