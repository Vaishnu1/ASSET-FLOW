package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocatorWarehouseDTO {
    private Long id;
    private String locatorName;
    private Long locatorId;
    private String dimension;
    private Boolean active;
    private Long warehouseId;
    private String createdBy;
    private String createdDtDisp;
}