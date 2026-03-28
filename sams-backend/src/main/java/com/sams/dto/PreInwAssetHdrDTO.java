package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PreInwAssetHdrDTO {
    private Long inwardInventoryHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long preInwStatusId;
    private String capexNumber;
    private Long shipToId;
    private String shipTo;
    private Long businessPartnerId;
    private String businessPartnerName;
    private Long businessPartnerSiteId;
    private String partnerSiteName;
    private String purchaseOrderNo;
    private LocalDateTime purchaseDt;
    private LocalDateTime expectedDtOfDelivery;
    private Long totalQty;
    private Double totalUnitPrice;
    private Double totalTaxAmount;
    private Double totalAmount;
    private String requestRaisedByPhoneNumber;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Long serviceProviderId;
    private Long serviceProviderSiteId;
    private Boolean internalPoNumber;
    private String preInwardNumber;
    private String docName;
    private String docType;
    private String filePath;
    private String partnerSiteAddress;
    private String serviceProviderSiteAddress;
}