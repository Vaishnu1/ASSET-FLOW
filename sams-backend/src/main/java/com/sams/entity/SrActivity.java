package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_activity", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_activity_id")
    private Long srActivityId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "activity_done_by")
    private String activityDoneBy;

    @Column(name = "internal_engineer_id")
    private Long internalEngineerId;

    @Column(name = "internal_engineer_name")
    private String internalEngineerName;

    @Column(name = "external_engineer_name")
    private String externalEngineerName;

    @Column(name = "external_engineer_contact_no")
    private String externalEngineerContactNo;

    @Column(name = "external_engineer_email_id")
    private String externalEngineerEmailId;

    @Column(name = "service_provided_by")
    private String serviceProvidedBy;

    @Column(name = "service_provided_by_id")
    private Long serviceProvidedById;

    @Column(name = "service_provided_by_name")
    private String serviceProvidedByName;

    @Column(name = "activity_dt")
    private LocalDateTime activityDt;

    @Column(name = "activity_start_dt")
    private LocalDateTime activityStartDt;

    @Column(name = "activity_end_dt")
    private LocalDateTime activityEndDt;

    @Column(name = "activity_start_time")
    private String activityStartTime;

    @Column(name = "activity_end_time")
    private String activityEndTime;

    @Column(name = "total_hrs")
    private String totalHrs;

    @Column(name = "activity_done")
    private String activityDone;

    @Column(name = "internal_engineer_remarks")
    private String internalEngineerRemarks;

    @Column(name = "external_engineer_remarks")
    private String externalEngineerRemarks;

    @Column(name = "internal_engineer_cost")
    private Double internalEngineerCost;

    @Column(name = "hold_flag")
    private Boolean holdFlag;

    @Column(name = "hold_start_dt")
    private LocalDateTime holdStartDt;

    @Column(name = "hold_end_dt")
    private LocalDateTime holdEndDt;

    @Column(name = "hold_start_time")
    private String holdStartTime;

    @Column(name = "hold_end_time")
    private String holdEndTime;

    @Column(name = "calibration_remarks")
    private String calibrationRemarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "physical_damage")
    private Boolean physicalDamage;

    @Column(name = "physical_damage_description")
    private String physicalDamageDescription;

    @Column(name = "findings")
    private String findings;

    @Column(name = "findings_description")
    private String findingsDescription;

    @Column(name = "corrective_actions")
    private String correctiveActions;

    @Column(name = "patient_safety")
    private Boolean patientSafety;

    @Column(name = "patient_safety_description")
    private String patientSafetyDescription;

    @Column(name = "efs")
    private String efs;

    @Column(name = "efs_id")
    private Long efsId;

    @Column(name = "activity_status_flag")
    private Boolean activityStatusFlag;

}