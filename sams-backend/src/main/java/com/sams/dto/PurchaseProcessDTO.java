package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchaseProcessDTO {
    private Long purchaseProcessId;
    private Long orgId;
    private String purchaseProcessName;
    private String createdBy;
    private LocalDateTime createdDt;
}