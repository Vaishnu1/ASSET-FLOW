package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockTransferHdrDTO {
    private Long stockTransferHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String stockTransferNo;
    private Long fromStoreId;
    private Long toStoreId;
    private Long fromAssetId;
    private Long toAssetId;
    private String stockTransferType;
    private String stockTransferStatus;
    private Long assetStatusId;
    private String sourceScreen;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}