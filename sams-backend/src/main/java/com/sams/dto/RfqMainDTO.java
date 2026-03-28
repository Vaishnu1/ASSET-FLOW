package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RfqMainDTO {
    private Long rfqMainId;
    private Long orgId;
    private Long locId;
    private Long poReqDtlId;
    private String poReqNo;
    private String srNo;
    private Long srId;
    private Long suppId;
    private String suppName;
    private String suppEmail1Id;
    private String suppEmail2Id;
    private String suppAddress1;
    private String suppAddress2;
    private String suppCity;
    private String suppState;
    private String suppCountry;
    private String suppPostalCd;
    private Long custId;
    private String custName;
    private String custEmailId;
    private String custAddress1;
    private String custAddress2;
    private String custCity;
    private String custState;
    private String custCountry;
    private String custPostalCd;
    private Long itemId;
    private String itemCd;
    private String itemDescription;
    private Double rcvQty;
    private Double estimatedPrice;
    private Double unitPrice;
    private Double rfqValue;
    private String paymentTerms;
    private String warrantyCoverage;
    private String packingForwarding;
    private String leadTime;
    private String otherInfo;
    private String comments;
    private String model;
    private String suppEmail3Id;
    private String suppEmail4Id;
    private String taxCd1;
    private Double taxRate1;
    private Double taxAmt1;
    private String taxCd2;
    private Double taxRate2;
    private Double taxAmt2;
    private String finalRfq;
    private Double itemNetAmt;
    private String poterm1;
    private String partStatus;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}