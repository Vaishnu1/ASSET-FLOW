package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PoTcInfoDTO {
    private Long poTcInfoId;
    private Long poHdrId;
    private Long tcTemplateHdrId;
    private Long tcParameterId;
    private String tcParameterName;
    private Long displaySequenceNo;
    private Long tcParameterChildId;
    private String tcParameterChildName;
    private String selEnteredValues;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String selEnteredValuesChild;
    private Long tcParameterChildId2;
    private String tcParameterChildName2;
    private String selEnteredValuesChild2;
    private Boolean isEditable;
    private Boolean tcParameterEditable;
    private Boolean tcParameterChildEditable;
}