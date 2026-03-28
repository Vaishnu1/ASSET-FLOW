package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemRegisterDTO {
    private Long itemRegisterId;
    private Long itemId;
    private String itemCd;
    private Long invDtlId;
    private String itemDesc;
    private LocalDateTime transactionDt;
    private String transactionDesc;
    private Double inQty;
    private Double outQty;
    private Double balanceQty;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}