package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class NumberControlDTO {
    private Long numberControlId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String numberControlName;
    private String numberControlDesc;
    private String numberControlModule;
    private String prefixCd;
    private String suffixCd;
    private Long lastNumber;
    private Long maxNumber;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}