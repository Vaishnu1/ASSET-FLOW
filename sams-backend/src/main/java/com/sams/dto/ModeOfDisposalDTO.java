package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModeOfDisposalDTO {
    private Long modeOfDisposalId;
    private Long orgId;
    private String modeOfDisposalName;
    private Boolean isGatepassNeeded;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}