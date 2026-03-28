package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrActivityCorrectActionsDTO {
    private Long srActivityCorrectActionsId;
    private Long orgId;
    private String srActivityCorrectActionsName;
    private String createdBy;
    private LocalDateTime createdDt;
}