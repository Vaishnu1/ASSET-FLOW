package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PreInwChildAssetDTO {
    private Long preInwChildAssetId;
    private Long inwardInventoryDtlId;
    private Long businessPartnerId;
    private String businessPartnerName;
    private Long modelId;
    private String modelName;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}