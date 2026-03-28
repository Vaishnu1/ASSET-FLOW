package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupCheckListDTO {
    private Long id;
    private Long checkListId;
    private String parameterName;
    private String parameterType;
    private String inputType;
    private String option1;
    private String option2;
    private String option3;
    private Integer noOfOptions;
    private String comboValues;
    private Integer minValue;
    private Integer maxValue;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
    private Long assetGroupId;
    private String direction;
    private String columnName;
}