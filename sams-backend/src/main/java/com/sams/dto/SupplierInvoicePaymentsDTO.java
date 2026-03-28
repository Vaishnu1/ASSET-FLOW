package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierInvoicePaymentsDTO {
    private Long supplierInvoicePaymentId;
    private Long supplierInvoiceHdrId;
    private String poNo;
    private Long poId;
    private String paymentNo;
    private Long paymentDt;
    private String paymentType;
    private String transactionId;
    private String transferBankDetails;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}