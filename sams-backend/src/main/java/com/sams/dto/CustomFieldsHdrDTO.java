package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustomFieldsHdrDTO {
    private Long customFieldsHdrId;
    private Long orgId;
    private Long assetSubCategoryId;
    private String attributeName;
    private String inputType;
    private Long inputMaxLength;
    private String basedOn;
    private String displayGroup;
    private Long displayGroupId;
    private String color;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}