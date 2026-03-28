package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChildAssetDTO {
    private Long childAssetId;
    private Long orgId;
    private Long assetHdrId;
    private Long childAssetHdrId;
    private String childAssetNo;
    private Boolean active;
    private LocalDateTime deletedDt;
    private String deletedBy;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}