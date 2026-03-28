package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ManufacturerSupplierDTO {
    private Long manufacturerSupplierId;
    private Long orgId;
    private Long manufacturerId;
    private Long supplierId;
    private Long supplierSiteId;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}