package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GatePassPurposeDTO {
    private Long gatePassPurposeId;
    private Long orgId;
    private String purposeName;
    private String createdBy;
    private LocalDateTime createdDt;
}