package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rtv_hdr", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RtvHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rtv_hdr_id")
    private Long rtvHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "rtv_no")
    private String rtvNo;

    @Column(name = "rtv_date")
    private LocalDateTime rtvDate;

    @Column(name = "grn_id")
    private Long grnId;

    @Column(name = "grn_no")
    private String grnNo;

    @Column(name = "do_no")
    private String doNo;

    @Column(name = "rtv_requested_by")
    private String rtvRequestedBy;

    @Column(name = "rtv_status")
    private String rtvStatus;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "rtv_remarks")
    private String rtvRemarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "reject_reason")
    private String rejectReason;

}