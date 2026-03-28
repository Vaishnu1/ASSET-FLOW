package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MaintScheduleFrequencyDTO {
    private Long maintScheduleFrequncyId;
    private Long orgId;
    private String maintScheduleFrequencyName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}