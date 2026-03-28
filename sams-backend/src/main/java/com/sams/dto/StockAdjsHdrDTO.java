package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockAdjsHdrDTO {
    private Long stockAdjsHdrId;
    private Long orgId;
    private Long locId;
    private String stockAdjsNo;
    private LocalDateTime transDt;
    private String transType;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}