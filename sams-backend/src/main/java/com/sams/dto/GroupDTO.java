package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GroupDTO {
    private Long groupId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String groupName;
    private Boolean superAdmin;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}