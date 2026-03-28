package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierInvoiceHdrDTO {
    private Long supplierInvoiceHdrId;
    private String supplierInvoiceNo;
    private Long orgId;
    private LocalDateTime invoiceRegDt;
    private LocalDateTime invoiceDt;
    private String invoiceStatus;
    private Long locationId;
    private String locationName;
    private Long supplierId;
    private String supplierCd;
    private String supplierName;
    private Long supplierSiteId;
    private String supplierSiteName;
    private String curCd;
    private Double exchRate;
    private Double basicInvoiceAmt;
    private Double taxTotal;
    private Double transCharges;
    private Double miscCharges;
    private Double totalInvoiceAmt;
    private String localCurCd;
    private Double localTotalAmt;
    private String matchAction;
    private LocalDateTime paymentDueDate;
    private Double advancePayments;
    private String remarks;
    private String remarks1;
    private String approvedBy;
    private LocalDateTime approvedDt;
    private String validatedBy;
    private LocalDateTime validatedDt;
    private String rejectedBy;
    private LocalDateTime rejectedDt;
    private String cancelledBy;
    private LocalDateTime cancelledDt;
    private String erpInterfacedFlag;
    private String erpInterfacedRemarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String grnType;
}