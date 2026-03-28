package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchaseStatusDTO {
    private Long purchaseStatusId;
    private String purchaseStatusName;
    private String sourceModule;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}