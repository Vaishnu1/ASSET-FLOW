package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TaxDTO {
    private Long taxId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String taxCode;
    private Double taxRate;
    private String taxDesc;
    private String taxComputation;
    private Boolean active;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}