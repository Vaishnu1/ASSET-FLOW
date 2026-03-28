package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "maint_schedule_hdr", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintScheduleHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_hdr_id")
    private Long scheduleHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "schedule_title")
    private String scheduleTitle;

    @Column(name = "schedule_type")
    private String scheduleType;

    @Column(name = "priority")
    private String priority;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "schedule_end_type")
    private String scheduleEndType;

    @Column(name = "occurrences")
    private Long occurrences;

    @Column(name = "sr_create_days_bef_sch")
    private Long srCreateDaysBefSch;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}