package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierModelSuppliedDTO {
    private Long id;
    private Long assetSuppliedId;
    private Long supplierId;
    private Long orgId;
    private Long manufacturerId;
    private String manufacturerName;
    private Long assetGroupId;
    private String assetGroupName;
    private Long modelId;
    private String modelName;
    private String createdBy;
    private String createdDt;
    private String updatedBy;
    private String updatedDtDt;
}