package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetAuditStatusDTO {
    private Long assetAuditStatusId;
    private Long displaySequenceOrder;
    private String assetAuditStatusName;
    private String assetAuditStatusDesc;
    private Boolean active;
    private String createBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}