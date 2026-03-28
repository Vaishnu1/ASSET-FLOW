package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmpLocDTO {
    private Long empLocId;
    private Long employeeId;
    private String employeeCode;
    private Long accessLocId;
    private String accessLocName;
    private Boolean defaultLocation;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}