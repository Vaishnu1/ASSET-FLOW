package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "maint_schedule_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintScheduleDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_dtl_id")
    private Long scheduleDtlId;

    @Column(name = "schedule_hdr_id")
    private Long scheduleHdrId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "occurrence_no")
    private Long occurrenceNo;

    @Column(name = "schedule_date")
    private LocalDateTime scheduleDate;

    @Column(name = "schedule_status")
    private String scheduleStatus;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_status")
    private String srStatus;

    @Column(name = "sr_assigned_to")
    private String srAssignedTo;

    @Column(name = "sr_closed_date")
    private LocalDateTime srClosedDate;

    @Column(name = "cancelled_by")
    private String cancelledBy;

    @Column(name = "cancelled_reason")
    private String cancelledReason;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "active")
    private Boolean active;

}