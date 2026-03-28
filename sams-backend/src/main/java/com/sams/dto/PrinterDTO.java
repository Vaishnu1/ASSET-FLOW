package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrinterDTO {
    private Long printerId;
    private Long orgId;
    private Long locationId;
    private String printerName;
    private Long printerModelId;
    private String printerModel;
    private String printerManufacturer;
    private String communicationType;
    private Boolean defaultPrinter;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}