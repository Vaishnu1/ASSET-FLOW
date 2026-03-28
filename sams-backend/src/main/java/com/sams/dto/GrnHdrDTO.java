package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GrnHdrDTO {
    private Long grnId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String grnNo;
    private LocalDateTime grnDt;
    private Long supplierId;
    private String supplierName;
    private Long supplierSiteId;
    private String supplierSiteName;
    private String doNo;
    private String grnStatus;
    private String supplierInvoiceNo;
    private LocalDateTime supplierInvoiceDt;
    private String supplierCd;
    private String supplierCurrencyCd;
    private String remarks;
    private Long orderType;
    private LocalDateTime doDt;
    private String errorFlg;
    private String errorMessage;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String grnFor;
    private String cancelReason;
    private String rejectReason;
    private Double supplierInvoiceAmount;
}