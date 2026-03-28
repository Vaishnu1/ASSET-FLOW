package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_invoice_payments", schema = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierInvoicePayments {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_invoice_payment_id")
    private Long supplierInvoicePaymentId;

    @Column(name = "supplier_invoice_hdr_id")
    private Long supplierInvoiceHdrId;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_id")
    private Long poId;

    @Column(name = "payment_no")
    private String paymentNo;

    @Column(name = "payment_dt")
    private Long paymentDt;

    @Column(name = "payment_type")
    private String paymentType;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "transfer_bank_details")
    private String transferBankDetails;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}