package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockAdjsDtlDTO {
    private Long stockAdjsDtlId;
    private Long stockAdjsHdrId;
    private Long itemId;
    private String itemCd;
    private Double availableQty;
    private Double rcvQty;
    private Double adjQty;
    private String woNo;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long whid;
    private String whcd;
}