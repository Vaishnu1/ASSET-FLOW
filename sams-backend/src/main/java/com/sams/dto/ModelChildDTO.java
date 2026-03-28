package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelChildDTO {
    private Long modelChildId;
    private Long orgId;
    private Long parentModelId;
    private Long childModelId;
    private Long childAssetGroupId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}