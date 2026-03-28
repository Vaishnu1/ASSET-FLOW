package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCheckPointsDTO {
    private Long assetCheckPtsId;
    private Long orgId;
    private Long assetId;
    private Long parameterTypeId;
    private String parameterType;
    private Long parameterId;
    private String parameterName;
    private Long parameterGroupId;
    private String parameterGroupName;
    private String usedFor;
    private String startValue;
    private String endValue;
    private String uom;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}