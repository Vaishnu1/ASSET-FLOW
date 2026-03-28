package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrEscalationDTO {
    private Long escalationSrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String srType;
    private Long fromStatusId;
    private Long toStatusId;
    private Long allowedMinutes;
    private String toEmailIds;
    private String ccEmailIds;
    private String bccEmailIds;
    private String notificationTypes;
    private Boolean active;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}