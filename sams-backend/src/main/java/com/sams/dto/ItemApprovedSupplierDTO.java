package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ItemApprovedSupplierDTO {
    private Long id;
    private Long itemApprovedSuppId;
    private Long itemId;
    private String itemName;
    private Long supplierId;
    private String supplierName;
    private String supplierItemCd;
    private Integer sourcingPercent;
    private Integer leadTimeDays;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private Long supplierSiteId;
    private String supplierSiteName;
}