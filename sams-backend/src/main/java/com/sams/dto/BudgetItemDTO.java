package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BudgetItemDTO {
    private Long budgetItemId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String budgetItemDescription;
    private String budgetItemExpenseType;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}