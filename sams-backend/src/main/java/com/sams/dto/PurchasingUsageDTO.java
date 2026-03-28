package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchasingUsageDTO {
    private Long purchasingUsageId;
    private Long orgId;
    private String purchasingUsageName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}