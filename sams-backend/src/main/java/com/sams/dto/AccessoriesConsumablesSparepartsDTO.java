package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AccessoriesConsumablesSparepartsDTO {
    private Long accessoriesConsumablesSparepartsId;
    private Long assetHdrId;
    private Long locationId;
    private Long itemId;
    private Long stockTransferDtlId;
    private Long stockTransferHdrId;
    private Double consumedQty;
    private Double remainingQty;
    private Double quantity;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}