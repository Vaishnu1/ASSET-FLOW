package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pre_inw_asset_hdr", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreInwAssetHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "inward_inventory_hdr_id")
    private Long inwardInventoryHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "pre_inw_status_id")
    private Long preInwStatusId;

    @Column(name = "capex_number")
    private String capexNumber;

    @Column(name = "ship_to_id")
    private Long shipToId;

    @Column(name = "ship_to")
    private String shipTo;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_name")
    private String businessPartnerName;

    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

    @Column(name = "partner_site_name")
    private String partnerSiteName;

    @Column(name = "purchase_order_no")
    private String purchaseOrderNo;

    @Column(name = "purchase_dt")
    private LocalDateTime purchaseDt;

    @Column(name = "expected_dt_of_delivery")
    private LocalDateTime expectedDtOfDelivery;

    @Column(name = "total_qty")
    private Long totalQty;

    @Column(name = "total_unit_price")
    private Double totalUnitPrice;

    @Column(name = "total_tax_amount")
    private Double totalTaxAmount;

    @Column(name = "total_amount")
    private Double totalAmount;

    @Column(name = "request_raised_by_phone_number")
    private String requestRaisedByPhoneNumber;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "service_provider_id")
    private Long serviceProviderId;

    @Column(name = "service_provider_site_id")
    private Long serviceProviderSiteId;

    @Column(name = "internal_po_number")
    private Boolean internalPoNumber;

    @Column(name = "pre_inward_number")
    private String preInwardNumber;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_type")
    private String docType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "partner_site_address")
    private String partnerSiteAddress;

    @Column(name = "service_provider_site_address")
    private String serviceProviderSiteAddress;

}