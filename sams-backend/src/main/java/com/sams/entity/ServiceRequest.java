package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_request", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "parent_sr_id")
    private Long parentSrId;

    @Column(name = "is_parent")
    private Boolean isParent;

    @Column(name = "sub_ticket_for")
    private String subTicketFor;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "description")
    private String description;

    @Column(name = "asset_serial_no")
    private String assetSerialNo;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "model_name")
    private String modelName;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "manufacturer_name")
    private String manufacturerName;

    @Column(name = "asset_type_id")
    private Long assetTypeId;

    @Column(name = "asset_type_name")
    private String assetTypeName;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "asset_group_desc")
    private String assetGroupDesc;

    @Column(name = "asset_status_id")
    private Long assetStatusId;

    @Column(name = "functionality")
    private String functionality;

    @Column(name = "maintenance_type")
    private String maintenanceType;

    @Column(name = "sub_department")
    private String subDepartment;

    @Column(name = "sub_department_id")
    private Long subDepartmentId;

    @Column(name = "room_name")
    private String roomName;

    @Column(name = "floor_name")
    private String floorName;

    @Column(name = "segment_name")
    private String segmentName;

    @Column(name = "block_name")
    private String blockName;

    @Column(name = "priority")
    private String priority;

    @Column(name = "risk")
    private String risk;

    @Column(name = "expected_installation_dt")
    private LocalDateTime expectedInstallationDt;

    @Column(name = "actual_installed_dt")
    private LocalDateTime actualInstalledDt;

    @Column(name = "installation_type")
    private String installationType;

    @Column(name = "installation_remarks")
    private String installationRemarks;

    @Column(name = "installation_done_by")
    private String installationDoneBy;

    @Column(name = "ins_internal_engineer_id")
    private Long insInternalEngineerId;

    @Column(name = "ins_internal_engineer_name")
    private String insInternalEngineerName;

    @Column(name = "installation_provided_by")
    private String installationProvidedBy;

    @Column(name = "installation_provided_by_id")
    private Long installationProvidedById;

    @Column(name = "installation_provided_by_name")
    private String installationProvidedByName;

    @Column(name = "ins_external_engineer_name")
    private String insExternalEngineerName;

    @Column(name = "ins_ext_engineer_contact_no")
    private String insExtEngineerContactNo;

    @Column(name = "ins_ext_engineer_email_id")
    private String insExtEngineerEmailId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_type")
    private String srType;

    @Column(name = "sr_priority")
    private String srPriority;

    @Column(name = "sr_severity")
    private String srSeverity;

    @Column(name = "sr_status_id")
    private Long srStatusId;

    @Column(name = "sr_remarks")
    private String srRemarks;

    @Column(name = "attribute_3_name")
    private String attribute3Name;

    @Column(name = "attribute_4_name")
    private String attribute4Name;

    @Column(name = "attribute_5_name")
    private String attribute5Name;

    @Column(name = "caller_name")
    private String callerName;

    @Column(name = "caller_contact_no")
    private String callerContactNo;

    @Column(name = "problem_reported")
    private String problemReported;

    @Column(name = "problem_observed")
    private String problemObserved;

    @Column(name = "action_taken")
    private String actionTaken;

    @Column(name = "problem_analysis_image")
    private String problemAnalysisImage;

    @Column(name = "sr_open_dt")
    private LocalDateTime srOpenDt;

    @Column(name = "sr_ack_dt")
    private LocalDateTime srAckDt;

    @Column(name = "work_start_est_arr_time")
    private LocalDateTime workStartEstArrTime;

    @Column(name = "sr_work_start_dt")
    private LocalDateTime srWorkStartDt;

    @Column(name = "sr_completed_dt")
    private LocalDateTime srCompletedDt;

    @Column(name = "sr_closed_dt")
    private LocalDateTime srClosedDt;

    @Column(name = "ack_by_user_id")
    private Long ackByUserId;

    @Column(name = "work_started_by_user_id")
    private Long workStartedByUserId;

    @Column(name = "completed_by_user_id")
    private Long completedByUserId;

    @Column(name = "closed_by_user_id")
    private Long closedByUserId;

    @Column(name = "total_down_hrs")
    private Double totalDownHrs;

    @Column(name = "cancelled_by")
    private String cancelledBy;

    @Column(name = "cancelled_dt")
    private LocalDateTime cancelledDt;

    @Column(name = "assigned_to")
    private String assignedTo;

    @Column(name = "assigned_to_id")
    private Long assignedToId;

    @Column(name = "assigned_dt")
    private LocalDateTime assignedDt;

    @Column(name = "assigned_by")
    private String assignedBy;

    @Column(name = "assigned_to_contact_no")
    private String assignedToContactNo;

    @Column(name = "re_assigned_from")
    private String reAssignedFrom;

    @Column(name = "re_assigned_from_id")
    private Long reAssignedFromId;

    @Column(name = "re_assigned_dt")
    private LocalDateTime reAssignedDt;

    @Column(name = "re_assigned_by")
    private String reAssignedBy;

    @Column(name = "reassigned_status")
    private String reassignedStatus;

    @Column(name = "reassigned_remarks")
    private String reassignedRemarks;

    @Column(name = "schd_dtl_id")
    private Long schdDtlId;

    @Column(name = "schd_name_ref")
    private String schdNameRef;

    @Column(name = "sr_create_images")
    private String srCreateImages;

    @Column(name = "sr_completed_images")
    private String srCompletedImages;

    @Column(name = "sr_closed_by_signature")
    private String srClosedBySignature;

    @Column(name = "closed_by_comments")
    private String closedByComments;

    @Column(name = "closed_by_rating")
    private Double closedByRating;

    @Column(name = "closed_by_name")
    private String closedByName;

    @Column(name = "close_verification_otp")
    private String closeVerificationOtp;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "contract_no")
    private String contractNo;

    @Column(name = "coverage_type")
    private String coverageType;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "asset_partially_working")
    private Boolean assetPartiallyWorking;

    @Column(name = "sr_hold")
    private Boolean srHold;

    @Column(name = "partially_working_reason")
    private String partiallyWorkingReason;

    @Column(name = "incident_description")
    private String incidentDescription;

    @Column(name = "asset_retire_id")
    private Long assetRetireId;

    @Column(name = "handover_completed")
    private Boolean handoverCompleted;

    @Column(name = "handover_completed_dt")
    private LocalDateTime handoverCompletedDt;

    @Column(name = "close_remarks")
    private String closeRemarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "maintenance_strategy")
    private String maintenanceStrategy;

    @Column(name = "pm_maintenance_strategy")
    private String pmMaintenanceStrategy;

    @Column(name = "pa_maintenance_strategy")
    private String paMaintenanceStrategy;

    @Column(name = "qa_maintenance_strategy")
    private String qaMaintenanceStrategy;

    @Column(name = "physical_damage_description")
    private String physicalDamageDescription;

    @Column(name = "efs")
    private String efs;

    @Column(name = "efs_id")
    private Long efsId;

    @Column(name = "incident_physical_damage")
    private String incidentPhysicalDamage;

    @Column(name = "physical_damage")
    private String physicalDamage;

    @Column(name = "sr_ack_coordinates")
    private String srAckCoordinates;

    @Column(name = "sr_ack_address")
    private String srAckAddress;

    @Column(name = "sr_physical_damage_coordinates")
    private String srPhysicalDamageCoordinates;

    @Column(name = "sr_physical_damage_address")
    private String srPhysicalDamageAddress;

    @Column(name = "sr_complete_coordinates")
    private String srCompleteCoordinates;

    @Column(name = "sr_complete_address")
    private String srCompleteAddress;

    @Column(name = "sr_close_coordinates")
    private String srCloseCoordinates;

    @Column(name = "sr_close_address")
    private String srCloseAddress;

    @Column(name = "sr_feedback_caller_sign")
    private String srFeedbackCallerSign;

    @Column(name = "sr_feedback")
    private String srFeedback;

    @Column(name = "sr_feedback_caller_remarks")
    private String srFeedbackCallerRemarks;

    @Column(name = "efs_soft_date")
    private LocalDateTime efsSoftDate;

}