package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SmsMessageDTO {
    private Long smsMessageId;
    private Long smsInformationId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long messageSend;
    private Long messageNew;
    private Long messageDelete;
    private String msgDestinationNumber;
    private String msgDestinationName;
    private Long msgDestinationId;
    private String dndCategory;
    private Long msgCount;
    private String referenceText;
    private String createdBy;
    private LocalDateTime createdDt;
    private LocalDateTime sentDt;
}