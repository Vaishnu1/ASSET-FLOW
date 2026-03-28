package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailInformationDTO {
    private Long emailInformationId;
    private String priority;
    private String messageFromEmail;
    private String messageTo;
    private String emailSubject;
    private String emailBody;
    private String createdBy;
    private LocalDateTime createdDt;
}