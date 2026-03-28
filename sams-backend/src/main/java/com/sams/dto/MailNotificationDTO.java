package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class MailNotificationDTO {
    private Long id;
    private Long mailNotificationId;
    private Long mainProcessId;
    private Long subProcessId;
    private String subProcessName;
    private String mainProcessName;
    private String toEmail;
    private String ccEmail;
    private String bccEmail;
    private Long orgId;
    private Long locationId;
    private String active;
    private Boolean activeDisp;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
    private String locationName;
}