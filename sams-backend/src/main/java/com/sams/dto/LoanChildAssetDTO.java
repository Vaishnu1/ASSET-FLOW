package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LoanChildAssetDTO {
    private Long loanChildAssetId;
    private Long orgId;
    private Long loanId;
    private Long childAssetId;
    private Long assetHdrId;
    private Boolean active;
    private Boolean childAssetIssued;
    private Boolean childAssetReturn;
    private Boolean childAssetWrittenOf;
    private String childAssetWrittenOfRemarks;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}