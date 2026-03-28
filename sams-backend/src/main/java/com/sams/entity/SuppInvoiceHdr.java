package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supp_invoice_hdr", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SuppInvoiceHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supp_invoice_id")
    private Long suppInvoiceId;

    @Column(name = "supp_invoice_no")
    private String suppInvoiceNo;

    @Column(name = "invoice_mode")
    private String invoiceMode;

    @Column(name = "invoice_reg_dt")
    private LocalDateTime invoiceRegDt;

    @Column(name = "invoice_dt")
    private LocalDateTime invoiceDt;

    @Column(name = "invoice_status")
    private Long invoiceStatus;

    @Column(name = "invoice_class")
    private String invoiceClass;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "supp_id")
    private Long suppId;

    @Column(name = "supp_cd")
    private String suppCd;

    @Column(name = "supp_name")
    private String suppName;

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

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "remarks1")
    private String remarks1;

    @Column(name = "add_validate")
    private String addValidate;

    @Column(name = "payment")
    private String payment;

    @Column(name = "approved_by")
    private String approvedBy;

    @Column(name = "approved_dt")
    private LocalDateTime approvedDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}