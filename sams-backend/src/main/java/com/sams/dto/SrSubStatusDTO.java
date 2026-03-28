package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrSubStatusDTO {
    private Long srSubStatusId;
    private Long orgId;
    private String srSubStatusName;
    private String moduleRef;
    private String createdBy;
    private LocalDateTime createdDt;
}