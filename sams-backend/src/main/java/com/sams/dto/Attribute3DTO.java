package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class Attribute3DTO {
    private Long id;
    private Long srAttributeId3;
    private Long orgId;
    private String attribute3Name;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private Long locationId;
    private String locationName;
}