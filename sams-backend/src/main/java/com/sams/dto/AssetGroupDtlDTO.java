package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetGroupDtlDTO {
    private Long id;
    private Long assetGroupDtlId;
    private Long assetGroupId;
    private Long modelId;
    private String modelName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String modelTO;
    private String assetGroupTO;
}