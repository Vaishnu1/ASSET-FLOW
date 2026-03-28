package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemManufacturerDTO {
    private Long itemMakeId;
    private Long orgId;
    private Long itemId;
    private Long manufacturerId;
    private String manufacturerPartNo;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}