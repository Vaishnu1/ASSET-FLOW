package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "ap_payment", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @Column(name = "loc_id")
    private Long locId;

    @Column(name = "loc_name")
    private String locName;

    @Column(name = "payment_no")
    private String paymentNo;

    @Column(name = "payment_dt")
    private LocalDateTime paymentDt;

    @Column(name = "payment_type")
    private Long paymentType;

    @Column(name = "payment_bank_id")
    private Long paymentBankId;

    @Column(name = "payment_bank_name")
    private String paymentBankName;

    @Column(name = "bank_id")
    private Long bankId;

    @Column(name = "bank_name")
    private String bankName;

    @Column(name = "bank_account_no")
    private String bankAccountNo;

    @Column(name = "bank_cur_cd")
    private String bankCurCd;

    @Column(name = "functional_cur_cd")
    private String functionalCurCd;

    @Column(name = "functional_amt")
    private Double functionalAmt;

    @Column(name = "applied_amt")
    private Double appliedAmt;

    @Column(name = "payment_amt")
    private Double paymentAmt;

    @Column(name = "unapplied_amt")
    private Double unappliedAmt;

    @Column(name = "supp_id")
    private Long suppId;

    @Column(name = "supp_name")
    private String suppName;

    @Column(name = "supp_bank_id")
    private Long suppBankId;

    @Column(name = "supp_bank_name")
    private String suppBankName;

    @Column(name = "supp_bank_account_no")
    private String suppBankAccountNo;

    @Column(name = "supp_bank_cur_cd")
    private String suppBankCurCd;

    @Column(name = "payment_cur_cd")
    private String paymentCurCd;

    @Column(name = "exch_rate")
    private Double exchRate;

    @Column(name = "prepayment_amt")
    private Double prepaymentAmt;

    @Column(name = "unidentified_amt")
    private Double unidentifiedAmt;

    @Column(name = "deposit_date")
    private LocalDateTime depositDate;

    @Column(name = "instrument_no")
    private String instrumentNo;

    @Column(name = "instrument_dt")
    private LocalDateTime instrumentDt;

    @Column(name = "payment_status")
    private Long paymentStatus;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "reverse_dt")
    private LocalDateTime reverseDt;

    @Column(name = "reason_id")
    private Long reasonId;

    @Column(name = "reason_desc")
    private String reasonDesc;

    @Column(name = "reverse_comments")
    private String reverseComments;

    @Column(name = "ap_comments")
    private String apComments;

    @Column(name = "loc_applied_amt")
    private Double locAppliedAmt;

    @Column(name = "loc_payment_amt")
    private Double locPaymentAmt;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    private String city;

    @Column(name = "supp_invoice_no")
    private String suppInvoiceNo;

}