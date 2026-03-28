package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemDTO {
    private Long id;
    private Long itemLocId;
    private Long locationId;
    private Boolean invoiceable;
    private String itemStatus;
    private Long storeId;
    private Integer maxStockQty;
    private Integer minStockQty;
    private String costingType;
    private Boolean serialControlled;
    private Boolean batchControlled;
    private Long itemMasterId;
    private Long supplierSiteId;
    private String locationName;
    private String itemNameConcat;
    private String itemSupplierList;
    private String itemLocAccessList;
    private Double totalCost;
    private String itemApprovalStatus;
    private String itemMasterTO;
    private Boolean active;
    private String activeDisplay;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String storeName;
}