package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmployeeAttendanceDTO {
    private Long employeeAttendanceId;
    private Long orgId;
    private Long employeeId;
    private Double latitude;
    private Double longitude;
    private String address;
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}