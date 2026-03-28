package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrCheckPointsDTO {
    private Long checkPointsId;
    private Long srId;
    private Long modelId;
    private Long modelCheckPtsId;
    private String parameterName;
    private String parameterType;
    private String startValue;
    private String endValue;
    private String uom;
    private String actualValue;
    private String result;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long parameterId;
    private Long parameterTypeId;
    private Long parameterGroupId;
    private String parameterGroupName;
    private String defaultValue;
    private String minAllowedValue;
    private String maxAllowedValue;
    private String inputType;
    private Long assetId;
    private Long assetCheckPtsId;
}