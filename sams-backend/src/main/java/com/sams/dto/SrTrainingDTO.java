package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrTrainingDTO {
    private Long srTrainingId;
    private Long orgId;
    private Long srId;
    private Long trainingTypeId;
    private String trainingTypeName;
    private LocalDateTime trainingDt;
    private String traineerDesc;
    private String traineerName;
    private String traineerContactNo;
    private String traineerEmailId;
    private String trainingCompany;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}