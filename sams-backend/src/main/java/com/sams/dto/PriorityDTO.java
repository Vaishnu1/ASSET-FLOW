package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PriorityDTO {
    private Long id;
    private Long priorityId;
    private Long orgId;
    private String priorityName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String orgName;
    private Long locationId;
    private String locationName;
}