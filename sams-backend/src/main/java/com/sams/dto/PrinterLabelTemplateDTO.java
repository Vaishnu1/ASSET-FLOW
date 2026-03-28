package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrinterLabelTemplateDTO {
    private Long printerLabelTemplateId;
    private Long printerModelId;
    private Long orgId;
    private Long locationId;
    private Long printerLabelId;
    private String templateName;
    private String fileName;
    private String templatePath;
    private String fileType;
    private Boolean defaultTemplate;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}