package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PurchaseTcTemplateDtlDTO {
    private Long tcTemplateDtlId;
    private Long tcTemplateHdrId;
    private Long tcParameterId;
    private String tcParameterName;
    private Long displaySequenceNo;
    private Long tcParameterChildId;
    private String tcParameterChildName;
    private Boolean active;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean tcParameterChildEditable;
    private Boolean tcParameterEditable;
}