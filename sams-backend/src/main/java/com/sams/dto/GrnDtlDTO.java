package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GrnDtlDTO {
    private Long grnDtlId;
    private Long grnId;
    private String grnNo;
    private String doNo;
    private LocalDateTime doDt;
    private Long supplierId;
    private String supplierName;
    private Long supplierSiteId;
    private String supplierSiteName;
    private Long poId;
    private String poNo;
    private String poReqNo;
    private Long poLineId;
    private String poLineNo;
    private LocalDateTime poDt;
    private Long itemId;
    private String itemName;
    private String description;
    private String makerPartCode;
    private String manufacturerPartNo;
    private String manufacturerName;
    private Long poQuantity;
    private Long poBalQty;
    private Long acceptQty;
    private Long rejectQty;
    private Long rcvQty;
    private Double taxAmt1;
    private Double taxAmt2;
    private Double taxAmt3;
    private String uomCd;
    private Long storeId;
    private String storeName;
    private Double unitPrice;
    private Double itemQtyPrice;
    private Double itemTax;
    private Long rejectReasonId;
    private Boolean rtvFlag;
    private String iqcCompleted;
    private String iqcRequired;
    private String cancelFlag;
    private String rejectReason;
    private Boolean confirmApproval;
    private String uploadToInventory;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Double rtvQty;
    private Long assetHdrId;
    private String assetCode;
    private Long srId;
    private String srNo;
    private Long itemTypeId;
    private String itemTypeName;
    private String poType;
}