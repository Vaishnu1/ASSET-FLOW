package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PoTcTriggerEventDTO {
    private Long poTcTriggerEventId;
    private Long orgId;
    private String triggentEventName;
    private String triggentEventType;
    private String triggentEventAt;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}