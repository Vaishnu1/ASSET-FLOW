package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pr_hdr", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pr_id")
    private Long prId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "pr_no")
    private String prNo;

    @Column(name = "pr_dt")
    private LocalDateTime prDt;

    @Column(name = "pr_status")
    private String prStatus;

    @Column(name = "total_basic_amt")
    private Double totalBasicAmt;

    @Column(name = "total_tax_amt")
    private Double totalTaxAmt;

    @Column(name = "grand_amt")
    private Double grandAmt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "pr_type")
    private String prType;

    @Column(name = "pr_reason")
    private String prReason;

    @Column(name = "pr_usage")
    private String prUsage;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "local_grand_amt")
    private Double localGrandAmt;

    @Column(name = "work_flow_process_status_id")
    private Long workFlowProcessStatusId;

}