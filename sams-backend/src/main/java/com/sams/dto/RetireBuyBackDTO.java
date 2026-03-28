package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RetireBuyBackDTO {
    private Long retireBuyBackId;
    private Long orgId;
    private Long assetRetireId;
    private Long buyBackModelId;
    private String buyBackRemarks;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}