package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocModuleTabAccessDTO {
    private Long locModuleTabAccessId;
    private Long orgId;
    private Long locationId;
    private String moduleName;
    private String tabName;
    private String tabDisplayName;
    private Boolean isEnabled;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}