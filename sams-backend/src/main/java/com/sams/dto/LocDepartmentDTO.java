package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocDepartmentDTO {
    private Long locDepartmentId;
    private Long locationId;
    private String locationName;
    private Long departmentId;
    private String departmentName;
    private Boolean active;
    private String designation;
    private String inchargeName;
    private Long designationId;
    private Long inchargeId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long blockId;
    private Long floorId;
    private Long roomId;
    private Long segmentId;
}