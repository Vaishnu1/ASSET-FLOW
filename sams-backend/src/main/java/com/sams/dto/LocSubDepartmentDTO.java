package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocSubDepartmentDTO {
    private Long locSubDeptId;
    private String locSubDeptName;
    private Long subDeptId;
    private Long orgId;
    private Long locationId;
    private Long locDepartmentId;
    private Long blockId;
    private Long floorId;
    private Long roomId;
    private Long segmentId;
    private Long inchargeId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}