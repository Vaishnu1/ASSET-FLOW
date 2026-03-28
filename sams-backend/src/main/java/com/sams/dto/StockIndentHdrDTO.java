package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockIndentHdrDTO {
    private Long indentHdrId;
    private String indentNo;
    private LocalDateTime indentDt;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long requestedById;
    private String processedFlg;
    private String requestedBy;
    private LocalDateTime requestedDt;
    private String indentStatus;
    private Long srId;
    private String srNo;
    private Long srActivityId;
    private Long storeId;
    private String storeName;
    private Long assetId;
    private String assetCode;
    private String errorFlg;
    private String errorMessage;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}