package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrActivityDTO {
    private Long srActivityId;
    private Long srId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String activityDoneBy;
    private Long internalEngineerId;
    private String internalEngineerName;
    private String externalEngineerName;
    private String externalEngineerContactNo;
    private String externalEngineerEmailId;
    private String serviceProvidedBy;
    private Long serviceProvidedById;
    private String serviceProvidedByName;
    private LocalDateTime activityDt;
    private LocalDateTime activityStartDt;
    private LocalDateTime activityEndDt;
    private String activityStartTime;
    private String activityEndTime;
    private String totalHrs;
    private String activityDone;
    private String internalEngineerRemarks;
    private String externalEngineerRemarks;
    private Double internalEngineerCost;
    private Boolean holdFlag;
    private LocalDateTime holdStartDt;
    private LocalDateTime holdEndDt;
    private String holdStartTime;
    private String holdEndTime;
    private String calibrationRemarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean physicalDamage;
    private String physicalDamageDescription;
    private String findings;
    private String findingsDescription;
    private String correctiveActions;
    private Boolean patientSafety;
    private String patientSafetyDescription;
    private String efs;
    private Long efsId;
    private Boolean activityStatusFlag;
}