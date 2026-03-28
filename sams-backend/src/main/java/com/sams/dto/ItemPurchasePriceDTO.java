package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemPurchasePriceDTO {
    private Long itemPurchasePriceId;
    private Long itemLocId;
    private Long supplierSiteId;
    private LocalDateTime priceEffFromDt;
    private LocalDateTime priceEffToDt;
    private Double unitPurchasePrice;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}