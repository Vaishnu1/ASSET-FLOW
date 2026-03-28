package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ContractAssetDTO {
    private Long contractAssetId;
    private Long contractId;
    private Long assetId;
    private Long modelId;
    private Boolean active;
    private String includedServices;
    private String excludedServices;
    private Double contractAmnt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}