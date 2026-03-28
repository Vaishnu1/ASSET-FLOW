package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AdditionalInfoDTO {
    private Long id;
    private Long modelOtherInfoId;
    private Long orgId;
    private Long modelId;
    private String infoName;
    private String infoLabel;
    private String infoTitle;
    private String intoType;
    private String infoDetails;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
}