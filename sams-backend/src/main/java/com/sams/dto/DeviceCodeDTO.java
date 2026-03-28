package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DeviceCodeDTO {
    private Long id;
    private Long deviceCodeId;
    private String deviceCode;
    private String deviceConcept;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
    private Long orgId;
}