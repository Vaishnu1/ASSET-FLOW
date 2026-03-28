package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCustomFieldsValueDTO {
    private Long customFieldsValueId;
    private Long orgId;
    private Long locationId;
    private Long customFieldsHdrId;
    private Long assetSubCategoryId;
    private Long assetId;
    private String fieldValue;
    private Long transactionId;
    private String transactionSource;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}