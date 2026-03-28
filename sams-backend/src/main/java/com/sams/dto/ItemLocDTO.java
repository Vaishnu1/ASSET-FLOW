package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemLocDTO {
    private Long itemLocId;
    private Long orgId;
    private Long locationId;
    private Long itemId;
    private Boolean active;
    private String itemStatus;
    private Boolean invoiceable;
    private Long storeId;
    private Double maxStockQty;
    private Double minStockQty;
    private String costingType;
    private Boolean serialControlled;
    private Boolean batchControlled;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}