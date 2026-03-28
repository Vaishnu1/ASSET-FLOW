package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "gate_pass_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GatePassDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gate_pass_dtl_id")
    private Long gatePassDtlId;

    @Column(name = "gate_pass_hdr_id")
    private Long gatePassHdrId;

    @Column(name = "gate_pass_for")
    private String gatePassFor;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "asset_code")
    private String assetCode;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_name")
    private String transactionName;

    @Column(name = "return_type")
    private String returnType;

    @Column(name = "asset_remarks")
    private String assetRemarks;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "returned_status")
    private String returnedStatus;

    @Column(name = "return_received_by_id")
    private Long returnReceivedById;

    @Column(name = "return_recevied_dt")
    private LocalDateTime returnReceviedDt;

    @Column(name = "expected_return_dt")
    private LocalDateTime expectedReturnDt;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "return_remarks")
    private String returnRemarks;

}