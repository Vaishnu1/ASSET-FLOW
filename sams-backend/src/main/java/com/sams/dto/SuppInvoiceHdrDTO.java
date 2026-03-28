package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SuppInvoiceHdrDTO {
    private Long suppInvoiceId;
    private String suppInvoiceNo;
    private String invoiceMode;
    private LocalDateTime invoiceRegDt;
    private LocalDateTime invoiceDt;
    private Long invoiceStatus;
    private String invoiceClass;
    private Long locationId;
    private String locationName;
    private Long suppId;
    private String suppCd;
    private String suppName;
    private String curCd;
    private Double exchRate;
    private Double basicInvoiceAmt;
    private Double taxTotal;
    private Double transCharges;
    private Double miscCharges;
    private Double totalInvoiceAmt;
    private String localCurCd;
    private Double localTotalAmt;
    private String remarks;
    private String remarks1;
    private String addValidate;
    private String payment;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}