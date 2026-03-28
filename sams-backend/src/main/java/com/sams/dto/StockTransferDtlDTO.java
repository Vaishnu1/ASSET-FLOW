package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockTransferDtlDTO {
    private Long stockTransferDtlId;
    private Long stockTransferHdrId;
    private Long itemTypeId;
    private String itemTypeName;
    private Long itemId;
    private Double availableQty;
    private Double transferQty;
    private Double issueQty;
    private Double consumedQty;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}