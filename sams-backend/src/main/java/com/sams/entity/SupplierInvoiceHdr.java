package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_invoice_hdr", schema = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierInvoiceHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_invoice_hdr_id")
    private Long supplierInvoiceHdrId;

    @Column(name = "supplier_invoice_no")
    private String supplierInvoiceNo;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "invoice_reg_dt")
    private LocalDateTime invoiceRegDt;

    @Column(name = "invoice_dt")
    private LocalDateTime invoiceDt;

    @Column(name = "invoice_status")
    private String invoiceStatus;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_cd")
    private String supplierCd;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "supplier_site_name")
    private String supplierSiteName;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "exch_rate")
    private Double exchRate;

    @Column(name = "basic_invoice_amt")
    private Double basicInvoiceAmt;

    @Column(name = "tax_total")
    private Double taxTotal;

    @Column(name = "trans_charges")
    private Double transCharges;

    @Column(name = "misc_charges")
    private Double miscCharges;

    @Column(name = "total_invoice_amt")
    private Double totalInvoiceAmt;

    @Column(name = "local_cur_cd")
    private String localCurCd;

    @Column(name = "local_total_amt")
    private Double localTotalAmt;

    @Column(name = "match_action")
    private String matchAction;

    @Column(name = "payment_due_date")
    private LocalDateTime paymentDueDate;

    @Column(name = "advance_payments")
    private Double advancePayments;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "remarks1")
    private String remarks1;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "validated_by")
    private String validatedBy;

    @Column(name = "validated_dt")
    private LocalDateTime validatedDt;

    @Column(name = "rejected_by")
    private String rejectedBy;

    @Column(name = "rejected_dt")
    private LocalDateTime rejectedDt;

    @Column(name = "cancelled_by")
    private String cancelledBy;

    @Column(name = "cancelled_dt")
    private LocalDateTime cancelledDt;

    @Column(name = "erp_interfaced_flag")
    private String erpInterfacedFlag;

    @Column(name = "erp_interfaced_remarks")
    private String erpInterfacedRemarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "grn_type")
    private String grnType;

}