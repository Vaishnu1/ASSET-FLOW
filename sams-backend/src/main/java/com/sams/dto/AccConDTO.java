package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class AccConDTO {
    private Long id;
    private Long accessorieConsumableId;
    private Long assetHdrId;
    private Long itemId;
    private String itemName;
    private String itemDesc;
    private String itemType;
    private String itemCategoryCode;
    private String manufacturerName;
    private String createdBy;
    private LocalDateTime createdDt;
    private String createdDtDisp;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
}