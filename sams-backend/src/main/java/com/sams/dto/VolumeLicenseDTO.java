package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class VolumeLicenseDTO {
    private Long volumeLicenseId;
    private Long orgId;
    private Long assetHdrId;
    private String productKey;
    private String status;
    private Long assignedAssetId;
    private Long childAssetId;
    private String assignedTo;
    private Long assignedEmployeeId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}