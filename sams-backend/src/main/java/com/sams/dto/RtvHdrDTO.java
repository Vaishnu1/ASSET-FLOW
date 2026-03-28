package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RtvHdrDTO {
    private Long rtvHdrId;
    private Long orgId;
    private Long locationId;
    private String rtvNo;
    private LocalDateTime rtvDate;
    private Long grnId;
    private String grnNo;
    private String doNo;
    private String rtvRequestedBy;
    private String rtvStatus;
    private Long supplierId;
    private Long supplierSiteId;
    private String rtvRemarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String cancelReason;
    private String rejectReason;
}