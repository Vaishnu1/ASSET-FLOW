package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ReferenceEmailServiceDbDTO {
    private Long refEsDbId;
    private String esDbName;
    private Long esDbPort;
    private String esDbUsername;
    private String esDbPassword;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}