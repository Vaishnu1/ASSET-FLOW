package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MaintScheduleHdrDTO {
    private Long scheduleHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String scheduleTitle;
    private String scheduleType;
    private String priority;
    private String frequency;
    private String scheduleEndType;
    private Long occurrences;
    private Long srCreateDaysBefSch;
    private LocalDateTime startDate;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}