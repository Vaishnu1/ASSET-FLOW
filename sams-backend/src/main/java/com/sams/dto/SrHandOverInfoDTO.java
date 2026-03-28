package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrHandOverInfoDTO {
    private Long srHandOverId;
    private Long srId;
    private Long orgId;
    private String handoverItemType;
    private Long employeeId;
    private String handOverRemarks;
    private LocalDateTime handOverDt;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}