package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ParameterGroupDTO {
    private Long id;
    private Long parameterGroupId;
    private Long orgId;
    private String parameterGroupName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private Long locationId;
    private String locationName;
}