package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "po_h", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoH {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_id")
    private Long poId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "po_revision_no")
    private Long poRevisionNo;

    @Column(name = "po_dt")
    private LocalDateTime poDt;

    @Column(name = "po_status")
    private String poStatus;

    @Column(name = "po_type")
    private String poType;

    @Column(name = "contract_type")
    private String contractType;

    @Column(name = "contract_start_dt")
    private LocalDateTime contractStartDt;

    @Column(name = "contract_end_dt")
    private LocalDateTime contractEndDt;

    @Column(name = "completion_flg")
    private Long completionFlg;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_name")
    private String businessPartnerName;

    @Column(name = "business_partner_site_id")
    private Long businessPartnerSiteId;

    @Column(name = "business_partner_site_name")
    private String businessPartnerSiteName;

    @Column(name = "bill_info_id")
    private Long billInfoId;

    @Column(name = "bill_info_name")
    private String billInfoName;

    @Column(name = "bill_address1")
    private String billAddress1;

    @Column(name = "bill_city")
    private String billCity;

    @Column(name = "bill_state")
    private String billState;

    @Column(name = "bill_country")
    private String billCountry;

    @Column(name = "bill_zip_code")
    private String billZipCode;

    @Column(name = "ship_info_id")
    private Long shipInfoId;

    @Column(name = "ship_info_name")
    private String shipInfoName;

    @Column(name = "ship_address1")
    private String shipAddress1;

    @Column(name = "ship_city")
    private String shipCity;

    @Column(name = "ship_state")
    private String shipState;

    @Column(name = "ship_country")
    private String shipCountry;

    @Column(name = "ship_zip_code")
    private String shipZipCode;

    @Column(name = "contact_person")
    private String contactPerson;

    @Column(name = "ship_terms_cd")
    private String shipTermsCd;

    @Column(name = "ship_mode_cd")
    private String shipModeCd;

    @Column(name = "pay_terms_cd")
    private String payTermsCd;

    @Column(name = "pay_term_days")
    private Long payTermDays;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "exch_rate")
    private Double exchRate;

    @Column(name = "transporter_name")
    private String transporterName;

    @Column(name = "transporter_address")
    private String transporterAddress;

    @Column(name = "po_req_dt")
    private LocalDateTime poReqDt;

    @Column(name = "total_amt")
    private Double totalAmt;

    @Column(name = "local_cur_cd")
    private String localCurCd;

    @Column(name = "local_basic_amt")
    private Double localBasicAmt;

    @Column(name = "customer_id")
    private Long customerId;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "net_tax_amt")
    private Double netTaxAmt;

    @Column(name = "basic_amt")
    private Double basicAmt;

    @Column(name = "freight_charges")
    private Double freightCharges;

    @Column(name = "handling_charges")
    private Double handlingCharges;

    @Column(name = "other_charges")
    private Double otherCharges;

    @Column(name = "loc_freight_charges")
    private Double locFreightCharges;

    @Column(name = "loc_handling_charges")
    private Double locHandlingCharges;

    @Column(name = "loc_other_charges")
    private Double locOtherCharges;

    @Column(name = "grand_total")
    private Double grandTotal;

    @Column(name = "local_grand_total")
    private Double localGrandTotal;

    @Column(name = "total_po_qty")
    private Long totalPoQty;

    @Column(name = "terms_conditions")
    private String termsConditions;

    @Column(name = "cancel_reason")
    private String cancelReason;

    @Column(name = "reject_reason")
    private String rejectReason;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "bill_to_contact_person")
    private String billToContactPerson;

    @Column(name = "bill_to_contact_person_no")
    private String billToContactPersonNo;

    @Column(name = "ship_to_contact_person")
    private String shipToContactPerson;

    @Column(name = "ship_to_contact_person_no")
    private String shipToContactPersonNo;

    @Column(name = "work_flow_process_status_id")
    private Long workFlowProcessStatusId;

    @Column(name = "bill_to_contact_person_1")
    private String billToContactPerson1;

    @Column(name = "bill_to_contact_person_no_1")
    private String billToContactPersonNo1;

    @Column(name = "ship_to_contact_person_1")
    private String shipToContactPerson1;

    @Column(name = "ship_to_contact_person_no_1")
    private String shipToContactPersonNo1;

    @Column(name = "is_from_cmms")
    private Boolean isFromCmms;

    @Column(name = "advance_amt_required")
    private Boolean advanceAmtRequired;

    @Column(name = "advance_amt_value")
    private Double advanceAmtValue;

    @Column(name = "ospr_terms_and_conditions")
    private String osprTermsAndConditions;

    @Column(name = "gst_number")
    private String gstNumber;

    @Column(name = "expected_arrival_date")
    private LocalDateTime expectedArrivalDate;

    @Column(name = "suppiler_contact_person_name")
    private String suppilerContactPersonName;

    @Column(name = "supplier_contact_number")
    private String supplierContactNumber;

    @Column(name = "sm_approved_login_id")
    private String smApprovedLoginId;

    @Column(name = "sm_approved_date")
    private LocalDateTime smApprovedDate;

    @Column(name = "vp_approved_login_id")
    private String vpApprovedLoginId;

    @Column(name = "vp_approved_date")
    private LocalDateTime vpApprovedDate;

    @Column(name = "advance_payment_percentage")
    private Double advancePaymentPercentage;

}