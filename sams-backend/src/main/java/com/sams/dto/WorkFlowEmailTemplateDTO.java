package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WorkFlowEmailTemplateDTO {
    private Long wfEmailTemplateId;
    private Long orgId;
    private Long processId;
    private String emailTemplateName;
    private String emailSubject;
    private String emailBody;
    private String emailFooter;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}