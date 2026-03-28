package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BudgetHdrDTO {
    private Long budgetHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String budgetName;
    private String budgetStatus;
    private Long fyStartMonth;
    private Long fyEndMonth;
    private String curCd;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}