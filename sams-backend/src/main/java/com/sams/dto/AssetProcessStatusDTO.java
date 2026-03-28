package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetProcessStatusDTO {
    private Long assetProcessStatusId;
    private Long assetId;
    private Long orgId;
    private Long locationId;
    private Long processId;
    private Long processStatusId;
    private Long transactionId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}