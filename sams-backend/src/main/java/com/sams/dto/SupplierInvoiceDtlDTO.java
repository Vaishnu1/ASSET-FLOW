package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierInvoiceDtlDTO {
    private Long supplierInvoiceDtlId;
    private Long supplierInvoiceHdrId;
    private Long poDtlId;
    private String poNo;
    private Long poLineNo;
    private String receiptsNo;
    private Long rcvDtlId;
    private Long itemId;
    private String itemCd;
    private String itemDesc;
    private String supplierItemCd;
    private String uomCd;
    private Double poQty;
    private Double grnQty;
    private Double invoiceQty;
    private Double poUnitPrice;
    private Double invoiceUnitPrice;
    private Double basicInvAmt;
    private String taxCd1;
    private Double taxRate1;
    private Double taxAmt1;
    private String taxCd2;
    private Double taxRate2;
    private Double taxAmt2;
    private Double totalTaxAmt;
    private Double totalInvAmt;
    private String matchedFlag;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long assetHdrId;
    private String assetCode;
    private Long srId;
    private String srNo;
    private String poType;
}