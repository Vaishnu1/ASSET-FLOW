package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CheckPointsDTO {
    private Long id;
    private Long checkPointsId;
    private Long srId;
    private Long modelId;
    private Long modelCheckPointsId;
    private String checkPointName;
    private String uom;
    private String frequency;
    private String duration;
    private String result;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
}