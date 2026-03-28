package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrDtlDTO {
    private Long prDtlId;
    private Long prId;
    private String prNo;
    private Long prLineNo;
    private Long supplierId;
    private String supplierName;
    private Long supplierSiteId;
    private String supplierSiteName;
    private String supplierItemCd;
    private String curCd;
    private Boolean newItemFlag;
    private Long itemId;
    private String itemName;
    private String itemDescription;
    private String manufacturerPartNo;
    private String uomCode;
    private Long itemCategoryId;
    private String itemCategoryName;
    private Long itemTypeId;
    private String itemTypeName;
    private Long prRequiredQty;
    private Long prCancelQty;
    private Double unitPrice;
    private LocalDateTime needByDt;
    private Double basicAmt;
    private String taxCd1;
    private Double taxRate1;
    private Double taxAmt1;
    private String taxCd2;
    private Double taxRate2;
    private Double taxAmt2;
    private String taxCd3;
    private Double taxRate3;
    private Double taxAmt3;
    private Double itemTotalTaxAmt;
    private Double totalAmt;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long poHdrId;
    private String poNo;
    private Double exchRate;
    private Double localTotalAmt;
}