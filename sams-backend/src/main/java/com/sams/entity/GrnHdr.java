package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "grn_hdr", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grn_id")
    private Long grnId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "grn_no")
    private String grnNo;

    @Column(name = "grn_dt")
    private LocalDateTime grnDt;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "supplier_site_name")
    private String supplierSiteName;

    @Column(name = "do_no")
    private String doNo;

    @Column(name = "grn_status")
    private String grnStatus;

    @Column(name = "supplier_invoice_no")
    private String supplierInvoiceNo;

    @Column(name = "supplier_invoice_dt")
    private LocalDateTime supplierInvoiceDt;

    @Column(name = "supplier_cd")
    private String supplierCd;

    @Column(name = "supplier_currency_cd")
    private String supplierCurrencyCd;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "order_type")
    private Long orderType;

    @Column(name = "do_dt")
    private LocalDateTime doDt;

    @Column(name = "error_flg")
    private String errorFlg;

    @Column(name = "error_message")
    private String errorMessage;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "grn_for")
    private String grnFor;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "supplier_invoice_amount")
    private Double supplierInvoiceAmount;

}