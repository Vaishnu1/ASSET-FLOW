package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RcvDtlLinesDTO {
    private Long rcvDtlLineId;
    private Long rcvHdrId;
    private Long rcvDtlId;
    private Long whId;
    private String whCd;
    private Long itemId;
    private String itemCd;
    private String lotNo;
    private String serialNo;
    private Double qty;
    private Double oldQty;
    private LocalDateTime lotExpiryDt;
    private Long locatorId;
    private String locatorCd;
    private String stockStatus;
    private String invStatus;
    private Long rejectReasonId;
    private String comments;
    private String supplierLotNo;
    private String spec1;
    private String spec2;
    private String spec3;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}