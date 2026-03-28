package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeDesignationDTO {
    private Long id;
    private Long employeeDesignationId;
    private Long employeeId;
    private String designationId;
    private String designationName;
    private LocalDateTime designationfromDate;
    private LocalDateTime designationtillDate;
    private Long reportingPersonId;
    private String reportingPersonName;
    private String status;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
}