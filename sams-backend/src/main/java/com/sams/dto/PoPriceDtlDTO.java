package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PoPriceDtlDTO {
    private Long poPriceDtlId;
    private Long poPriceHdrId;
    private String itemName;
    private Long itemId;
    private Double unitPrice;
    private String uomCode;
    private Long supplierId;
    private String supplierName;
    private Double currency;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}