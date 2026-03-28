package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GatePassDtlDTO {
    private Long gatePassDtlId;
    private Long gatePassHdrId;
    private String gatePassFor;
    private Long assetId;
    private String assetCode;
    private Long transactionId;
    private String transactionName;
    private String returnType;
    private String assetRemarks;
    private Long quantity;
    private String returnedStatus;
    private Long returnReceivedById;
    private LocalDateTime returnReceviedDt;
    private LocalDateTime expectedReturnDt;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String returnRemarks;
}