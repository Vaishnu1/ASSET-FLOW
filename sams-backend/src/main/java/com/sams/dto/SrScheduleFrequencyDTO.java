package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrScheduleFrequencyDTO {
    private Long srScheduleFrequencyId;
    private String frequencyId;
    private String frequencyName;
    private Long orgId;
    private Boolean active;
}