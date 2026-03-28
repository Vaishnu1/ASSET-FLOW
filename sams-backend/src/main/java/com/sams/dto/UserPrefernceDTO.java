package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserPrefernceDTO {
    private Long userPrefernceId;
    private Long orgId;
    private Long userId;
    private String moduleKey;
    private String customColumns;
    private String customFilters;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}