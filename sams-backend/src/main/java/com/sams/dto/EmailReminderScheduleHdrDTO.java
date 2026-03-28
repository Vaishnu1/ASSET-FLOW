package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailReminderScheduleHdrDTO {
    private Long emailReminderScheduleHdrId;
    private Long orgId;
    private Long locationId;
    private Long processId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}