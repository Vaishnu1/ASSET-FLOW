package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SuppInvoiceDtlDTO {
    private Long suppInvoiceDtlId;
    private Long suppInvoiceId;
    private Long poDtlId;
    private String poNo;
    private Long poLineNo;
    private String receiptsNo;
    private Long rcvDtlId;
    private Long itemId;
    private String itemCd;
    private String itemDesc;
    private String suppItemCd;
    private String uomCd;
    private Double invQty;
    private Double unitPrice;
    private Double locUnitPrice;
    private Double invAmt;
    private Double localInvAmt;
    private LocalDateTime shipReqDt;
    private LocalDateTime shipScheduleDt;
    private LocalDateTime lastShipDt;
    private String remarks;
    private String serialNo;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}