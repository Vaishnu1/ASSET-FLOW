package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemTransactionsDTO {
    private Long transactionId;
    private Long orgId;
    private Long locationId;
    private LocalDateTime transactionDate;
    private Long transactionSourceId;
    private Long transactionSourceLineId;
    private String transactionSourceName;
    private String transactionReference;
    private String transactionReferenceExternal;
    private String transactionAction;
    private String transactionType;
    private String transactionTypeReferenceNo;
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private Long storeId;
    private Double transactionQty;
    private Long orignialTransactionId;
    private Long binId;
    private Long projectId;
    private Long supplierId;
    private String createdBy;
    private Long itemTypeId;
    private String itemTypeName;
}