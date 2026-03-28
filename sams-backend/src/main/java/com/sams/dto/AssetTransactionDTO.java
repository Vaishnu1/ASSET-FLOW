package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AssetTransactionDTO {
    private Long assetTransactionId;
    private Long assetHdrId;
    private String assetTransactionSource;
    private String assetTransactionSourceDesc;
    private Long assetTransactionSourceId;
    private String assetTransactionSourceNo;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String assetTransactionName;
}