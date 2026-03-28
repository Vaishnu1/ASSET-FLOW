package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class InventoryDtlDTO {
    private Long invDtlId;
    private Long orgId;
    private Long locationId;
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private String manufacturerPartNo;
    private String uomCd;
    private Long storeId;
    private String storeName;
    private Double onHandQty;
    private Long createTransactionId;
    private Long updateTransactionId;
    private Long binId;
    private String lotNumber;
    private Long projectId;
    private LocalDateTime originalReceivedDate;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}