package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrinterModelDTO {
    private Long printerModelId;
    private Long orgId;
    private String printerManufacturer;
    private String printerModel;
    private Boolean defaultModel;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}