package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetStatusDTO {
    private Long id;
    private Long assetStatusId;
    private String assetStatusName;
    private Long orgId;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
}