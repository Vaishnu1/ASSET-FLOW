package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RcvHdrDTO {
    private Long rcvHdrId;
    private Long locationId;
    private String locationName;
    private String caNo;
    private LocalDateTime rcvDt;
    private String receiptNo;
    private LocalDateTime receiptDt;
    private String rcvSource;
    private Long orderType;
    private Long suppId;
    private String suppCd;
    private String suppName;
    private Long suppWhId;
    private String suppWhCd;
    private Long custId;
    private String custCd;
    private String custName;
    private String requisitionNo;
    private String rmaNo;
    private String waybillNo;
    private String vehicleCarrierNo;
    private String transporterName;
    private String receivedBy;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String poNo;
    private String partGroup;
    private String typeOfConsignment;
    private String serviceReqNo;
    private String checkedBy;
    private String empCdNo;
    private String issuedTo;
    private String inchargeName;
    private String invoice;
    private String transactionNo;
    private String replacement;
    private String depName;
    private Long depId;
    private String woNumber;
    private LocalDateTime poDate;
    private LocalDateTime supInvDate;
    private Double supInvAmnt;
    private String ceid;
    private Boolean active;
}