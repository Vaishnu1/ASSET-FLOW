package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailReminderScheduleDtlDTO {
    private Long emailReminderScheduleDtlId;
    private Long emailReminderScheduleHdrId;
    private Long transId;
    private Long numberOfDays;
    private String reminderType;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}