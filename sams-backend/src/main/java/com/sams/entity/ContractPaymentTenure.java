package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contract_payment_tenure", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractPaymentTenure {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_payment_tenure_id")
    private Long contractPaymentTenureId;

    @Column(name = "contract_id")
    private Long contractId;

    @Column(name = "payment_amount")
    private Double paymentAmount;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    @Column(name = "payment_mode")
    private String paymentMode;

    @Column(name = "instrument_no")
    private String instrumentNo;

    @Column(name = "instrument_amnt")
    private Long instrumentAmnt;

    @Column(name = "instrument_date")
    private LocalDateTime instrumentDate;

    @Column(name = "bank_name")
    private String bankName;

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

}