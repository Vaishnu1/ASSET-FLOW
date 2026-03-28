package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TransactionActivityDTO {
    private Long transactionActivityId;
    private Long orgId;
    private Long locationId;
    private Long transactionId;
    private String transactionName;
    private String transactionSource;
    private Long transactionDoneBy;
    private String activityName;
    private String activityDesc;
    private String updatedBy;
    private LocalDateTime updatedDt;
}