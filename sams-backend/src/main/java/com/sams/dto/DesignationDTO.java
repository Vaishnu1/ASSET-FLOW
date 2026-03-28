package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DesignationDTO {
    private Long id;
    private Long designationId;
    private Long locationId;
    private String designationName;
    private String designationDesc;
    private String active;
    private Boolean activeDisp;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
}