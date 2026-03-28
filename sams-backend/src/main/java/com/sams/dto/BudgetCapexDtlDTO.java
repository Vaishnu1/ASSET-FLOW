package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class BudgetCapexDtlDTO {
    private Long budgetCapexDtlId;
    private Long budgetDtlId;
    private Long modelName;
    private String remarks;
    private Double qty;
    private String procrumentType;
    private String procrumentReason;
    private String curCd;
    private Double actualSpentAmount;
    private String assetGroupName;
    private Double unitPrice;
    private Double budgetAmount;
    private String manufacturer;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}