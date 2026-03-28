package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetTypeDTO {
    private Long id;
    private Long assetTypeId;
    private String assetTypeName;
    private Long orgId;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private LocalDateTime createdDt;
    private LocalDateTime updatedDt;
    private String subCategoryName;
    private Long subCategoryId;
}