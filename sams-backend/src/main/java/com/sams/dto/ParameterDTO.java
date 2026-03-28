package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ParameterDTO {
    private Long id;
    private Long parameterId;
    private Long orgId;
    private String parameterName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private Long locationId;
    private String locationName;
}