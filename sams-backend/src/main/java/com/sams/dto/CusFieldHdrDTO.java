package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CusFieldHdrDTO {
    private Long id;
    private Long customHdrId;
    private Long customFieldValId;
    private Long orgId;
    private Long assetSubCategoryId;
    private String labelName;
    private String inputType;
    private Integer inputMaxLength;
    private Boolean active;
    private String value;
    private String values;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
    private String customComboList;
    private String assetCustomFieldValue;
    private String value1;
    private String basedOn;
    private String basedOnDisp;
    private String displayGroup;
    private String color;
    private Long displayGroupId;
    private Long assetGroupId;
    private Long modelId;
    private Long transactionId;
    private String transactionSrc;
}