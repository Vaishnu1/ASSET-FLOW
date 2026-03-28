package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrReasonDTO {
    private Long prReasonId;
    private String prReasonName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}