package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LoanAssetAccessoriesDTO {
    private Long loanAssetAccessoriesId;
    private Long orgId;
    private Long loanId;
    private Long assetHdrId;
    private Long modelItemId;
    private Boolean accessoriesIssued;
    private Boolean accessoriesReturned;
    private Boolean accessoriesWrittenOf;
    private String accessoriesWrittenOfRemarks;
    private String remarks;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}