package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocAssetCodeGenerationDTO {
    private Long locAssetCodeGenerationId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long subCategoryId;
    private String subCategoryName;
    private String prefix;
    private String variable1;
    private String variable2;
    private String variable3;
    private String separator;
    private Boolean autoGenerate;
    private String sequenceName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}