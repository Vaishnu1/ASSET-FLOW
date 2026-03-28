package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SmsCreditsDTO {
    private Long smsCreditsId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long creditLimit;
    private Long totalSmsSent;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}