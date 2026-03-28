package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrActivityFindingsDTO {
    private Long srActivityFindingsId;
    private Long orgId;
    private String srActivityFindingsName;
    private String createdBy;
    private LocalDateTime createdDt;
}