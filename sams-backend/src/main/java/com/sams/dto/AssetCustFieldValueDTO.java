package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetCustFieldValueDTO {
    private Long id;
    private Long customFieldValId;
    private Long customHdrId;
    private Long assetCategoryId;
    private Long orgId;
    private Long locationId;
    private Long transactionId;
    private String transactionSource;
    private String value;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}