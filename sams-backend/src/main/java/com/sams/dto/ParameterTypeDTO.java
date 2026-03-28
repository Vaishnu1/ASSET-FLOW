package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ParameterTypeDTO {
    private Long id;
    private Long parameterTypeId;
    private Long orgId;
    private String parameterTypeName;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private Long locationId;
    private String locationName;
    private String parameterTypeNameDisp;
}