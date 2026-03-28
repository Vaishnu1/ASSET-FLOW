package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InventoryAuditDTO {
    private Long inventoryAuditId;
    private String inventoryAuditNo;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long inventoryId;
    private Long storeId;
    private String storeName;
    private Long itemId;
    private String itemName;
    private Double unitPrice;
    private Double oldStkInHand;
    private Double newStkInHand;
    private Long transactionId;
    private String transactionSrc;
    private LocalDateTime transactionDt;
    private String transactionNo;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
}