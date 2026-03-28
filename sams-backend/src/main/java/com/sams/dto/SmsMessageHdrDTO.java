package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SmsMessageHdrDTO {
    private Long smsMessageHdrId;
    private String priority;
    private String messageFromNumber;
    private String messageFrom;
    private String msgText;
    private String createdBy;
    private LocalDateTime createdDt;
}