package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MaintScheduleDtlDTO {
    private Long scheduleDtlId;
    private Long scheduleHdrId;
    private Long assetHdrId;
    private Long locationId;
    private String locationName;
    private Long occurrenceNo;
    private LocalDateTime scheduleDate;
    private String scheduleStatus;
    private Long srId;
    private String srNo;
    private String srStatus;
    private String srAssignedTo;
    private LocalDateTime srClosedDate;
    private String cancelledBy;
    private String cancelledReason;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean active;
}