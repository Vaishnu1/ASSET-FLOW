package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserGroupMappingDTO {
    private Long userGroupMappingId;
    private Long orgId;
    private Long userGroupId;
    private String userGroupName;
    private Long userId;
    private String createdBy;
    private LocalDateTime createdDt;
    private Boolean active;
}