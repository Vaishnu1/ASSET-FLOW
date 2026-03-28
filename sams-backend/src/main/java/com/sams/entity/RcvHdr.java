package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "rcv_hdr", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RcvHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rcv_hdr_id")
    private Long rcvHdrId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "ca_no")
    private String caNo;

    @Column(name = "rcv_dt")
    private LocalDateTime rcvDt;

    @Column(name = "receipt_no")
    private String receiptNo;

    @Column(name = "receipt_dt")
    private LocalDateTime receiptDt;

    @Column(name = "rcv_source")
    private String rcvSource;

    @Column(name = "order_type")
    private Long orderType;

    @Column(name = "supp_id")
    private Long suppId;

    @Column(name = "supp_cd")
    private String suppCd;

    @Column(name = "supp_name")
    private String suppName;

    @Column(name = "supp_wh_id")
    private Long suppWhId;

    @Column(name = "supp_wh_cd")
    private String suppWhCd;

    @Column(name = "cust_id")
    private Long custId;

    @Column(name = "cust_cd")
    private String custCd;

    @Column(name = "cust_name")
    private String custName;

    @Column(name = "requisition_no")
    private String requisitionNo;

    @Column(name = "rma_no")
    private String rmaNo;

    @Column(name = "waybill_no")
    private String waybillNo;

    @Column(name = "vehicle_carrier_no")
    private String vehicleCarrierNo;

    @Column(name = "transporter_name")
    private String transporterName;

    @Column(name = "received_by")
    private String receivedBy;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "po_no")
    private String poNo;

    @Column(name = "part_group")
    private String partGroup;

    @Column(name = "type_of_consignment")
    private String typeOfConsignment;

    @Column(name = "service_req_no")
    private String serviceReqNo;

    @Column(name = "checked_by")
    private String checkedBy;

    @Column(name = "emp_cd_no")
    private String empCdNo;

    @Column(name = "issued_to")
    private String issuedTo;

    @Column(name = "incharge_name")
    private String inchargeName;

    @Column(name = "invoice")
    private String invoice;

    @Column(name = "transaction_no")
    private String transactionNo;

    @Column(name = "replacement")
    private String replacement;

    @Column(name = "dep_name")
    private String depName;

    @Column(name = "dep_id")
    private Long depId;

    @Column(name = "wo_number")
    private String woNumber;

    @Column(name = "po_date")
    private LocalDateTime poDate;

    @Column(name = "sup_inv_date")
    private LocalDateTime supInvDate;

    @Column(name = "sup_inv_amnt")
    private Double supInvAmnt;

    @Column(name = "ceid")
    private String ceid;

    @Column(name = "active")
    private Boolean active;

}