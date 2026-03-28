package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupCheckPointsDTO {
    private Long assetGroupCheckPtsId;
    private Long orgId;
    private Long assetGroupId;
    private Long parameterId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}