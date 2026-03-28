package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockIndentDtlDTO {
    private Long indentDtlId;
    private Long indentHdrId;
    private String indentNo;
    private Long srId;
    private String srNo;
    private Long srActivityId;
    private Long itemId;
    private String itemName;
    private String description;
    private String makerPartCode;
    private Long availableQty;
    private Long indentQty;
    private Long issueQty;
    private Long storeId;
    private String storeName;
    private String uom;
    private String errorFlg;
    private String errorMessage;
    private Double unitPrice;
    private String processedFlg;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long itemTypeId;
    private String itemTypeName;
}