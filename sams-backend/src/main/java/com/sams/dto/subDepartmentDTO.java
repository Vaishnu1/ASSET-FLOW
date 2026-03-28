package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class subDepartmentDTO {
    private Long id;
    private Long departmentId;
    private String departmentName;
    private Long subDepartmentId;
    private String subDepartmentName;
    private Long employeeId;
    private String subDepEmployeeName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
    private Long logInUserOrgId;
    private Long logInUserLocId;
    private Long logInUserId;
    private String subDepEmailId;
    private String subDepContactNo;
    private Long orgId;
    private String orgName;
    private String subDepartmentCode;
}