package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rfq_main", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RfqMain {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rfq_main_id")
    private Long rfqMainId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "loc_id")
    private Long locId;

    @Column(name = "po_req_dtl_id")
    private Long poReqDtlId;

    @Column(name = "po_req_no")
    private String poReqNo;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "supp_id")
    private Long suppId;

    @Column(name = "supp_name")
    private String suppName;

    @Column(name = "supp_email1_id")
    private String suppEmail1Id;

    @Column(name = "supp_email2_id")
    private String suppEmail2Id;

    @Column(name = "supp_address1")
    private String suppAddress1;

    @Column(name = "supp_address2")
    private String suppAddress2;

    @Column(name = "supp_city")
    private String suppCity;

    @Column(name = "supp_state")
    private String suppState;

    @Column(name = "supp_country")
    private String suppCountry;

    @Column(name = "supp_postal_cd")
    private String suppPostalCd;

    @Column(name = "cust_id")
    private Long custId;

    @Column(name = "cust_name")
    private String custName;

    @Column(name = "cust_email_id")
    private String custEmailId;

    @Column(name = "cust_address1")
    private String custAddress1;

    @Column(name = "cust_address2")
    private String custAddress2;

    @Column(name = "cust_city")
    private String custCity;

    @Column(name = "cust_state")
    private String custState;

    @Column(name = "cust_country")
    private String custCountry;

    @Column(name = "cust_postal_cd")
    private String custPostalCd;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_cd")
    private String itemCd;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "rcv_qty")
    private Double rcvQty;

    @Column(name = "estimated_price")
    private Double estimatedPrice;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "rfq_value")
    private Double rfqValue;

    @Column(name = "payment_terms")
    private String paymentTerms;

    @Column(name = "warranty_coverage")
    private String warrantyCoverage;

    @Column(name = "packing_forwarding")
    private String packingForwarding;

    @Column(name = "lead_time")
    private String leadTime;

    @Column(name = "other_info")
    private String otherInfo;

    @Column(name = "comments")
    private String comments;

    @Column(name = "model")
    private String model;

    @Column(name = "supp_email3_id")
    private String suppEmail3Id;

    @Column(name = "supp_email4_id")
    private String suppEmail4Id;

    @Column(name = "tax_cd1")
    private String taxCd1;

    @Column(name = "tax_rate1")
    private Double taxRate1;

    @Column(name = "tax_amt1")
    private Double taxAmt1;

    @Column(name = "tax_cd2")
    private String taxCd2;

    @Column(name = "tax_rate2")
    private Double taxRate2;

    @Column(name = "tax_amt2")
    private Double taxAmt2;

    @Column(name = "final_rfq")
    private String finalRfq;

    @Column(name = "item_net_amt")
    private Double itemNetAmt;

    @Column(name = "poterm1")
    private String poterm1;

    @Column(name = "part_status")
    private String partStatus;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}