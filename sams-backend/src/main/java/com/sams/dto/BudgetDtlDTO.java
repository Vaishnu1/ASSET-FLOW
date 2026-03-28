package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BudgetDtlDTO {
    private Long budgetDtlId;
    private Long budgetHdrId;
    private String budgetItem;
    private Double budgetAmount;
    private Double actualSpentAmount;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}