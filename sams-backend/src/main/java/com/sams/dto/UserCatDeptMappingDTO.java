package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserCatDeptMappingDTO {
    private Long userCatDeptMappingId;
    private Long orgId;
    private Long locationId;
    private Long userId;
    private Long categoryId;
    private Long departmentId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}