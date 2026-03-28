package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrHdrDTO {
    private Long prId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String prNo;
    private LocalDateTime prDt;
    private String prStatus;
    private Double totalBasicAmt;
    private Double totalTaxAmt;
    private Double grandAmt;
    private String remarks;
    private Long assetHdrId;
    private String assetCode;
    private Long srId;
    private String srNo;
    private String prType;
    private String prReason;
    private String prUsage;
    private String cancelReason;
    private String rejectReason;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Double localGrandAmt;
    private Long workFlowProcessStatusId;
}