package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchaseTcParametersDTO {
    private Long tcParameterId;
    private Long orgId;
    private String tcParameterName;
    private String tcParameterInputType;
    private String tcParameterInputValues;
    private String tcParameterRemarks;
    private Boolean active;
    private String triggerEvent;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String tcParameterFor;
    private Boolean isEditable;
}