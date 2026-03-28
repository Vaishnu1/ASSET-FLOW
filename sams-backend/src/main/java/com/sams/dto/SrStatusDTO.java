package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrStatusDTO {
    private Long srStatusId;
    private Long srId;
    private Long srActivityId;
    private String srStatus;
    private Double latitude;
    private Double longitude;
    private String address;
    private String createdBy;
    private LocalDateTime createdDt;
}