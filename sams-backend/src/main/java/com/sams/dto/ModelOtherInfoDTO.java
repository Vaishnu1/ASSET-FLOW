package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ModelOtherInfoDTO {
    private Long modelOtherInfoId;
    private Long orgId;
    private Long modelId;
    private String infoName;
    private String infoLabel;
    private String infoTitle;
    private String infoType;
    private String infoDetails;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}