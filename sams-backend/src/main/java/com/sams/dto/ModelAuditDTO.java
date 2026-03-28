package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelAuditDTO {
    private Long modelId;
    private String mode;
    private Long orgId;
    private String modelNo;
    private String modelName;
    private Long businessPartnerId;
    private Long assetSubCategoryId;
    private Long assetCategoryId;
    private Long assetTypeId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}