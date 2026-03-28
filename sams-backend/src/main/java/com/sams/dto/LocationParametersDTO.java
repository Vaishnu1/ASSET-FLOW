package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocationParametersDTO {
    private Long locParameterId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String locParameterName;
    private Boolean locParameterEnabled;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}