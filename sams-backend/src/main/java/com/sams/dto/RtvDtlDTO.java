package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RtvDtlDTO {
    private Long rtvDtlId;
    private Long rtvHdrId;
    private String poNo;
    private Long grnDtlId;
    private Long poLineId;
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private Long storeId;
    private Double poQty;
    private Double grnQty;
    private Double rtvQty;
    private Double stockQty;
    private String uomCd;
    private String manufacturerPartNo;
    private String rtvReason;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long itemTypeId;
    private String itemTypeName;
}