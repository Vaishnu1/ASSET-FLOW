package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class departmentDtlDTO {
    private Long id;
    private Long departFacultyId;
    private Long departmentId;
    private String departmentName;
    private Long employeeId;
    private String employeeName;
    private String facultyContactNo;
    private String facultyEmailId;
    private String active;
    private Boolean activeDisp;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
}