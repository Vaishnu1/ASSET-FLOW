package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ApPaymentDTO {
    private Long paymentId;
    private Long locId;
    private String locName;
    private String paymentNo;
    private LocalDateTime paymentDt;
    private Long paymentType;
    private Long paymentBankId;
    private String paymentBankName;
    private Long bankId;
    private String bankName;
    private String bankAccountNo;
    private String bankCurCd;
    private String functionalCurCd;
    private Double functionalAmt;
    private Double appliedAmt;
    private Double paymentAmt;
    private Double unappliedAmt;
    private Long suppId;
    private String suppName;
    private Long suppBankId;
    private String suppBankName;
    private String suppBankAccountNo;
    private String suppBankCurCd;
    private String paymentCurCd;
    private Double exchRate;
    private Double prepaymentAmt;
    private Double unidentifiedAmt;
    private LocalDateTime depositDate;
    private String instrumentNo;
    private LocalDateTime instrumentDt;
    private Long paymentStatus;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private LocalDateTime reverseDt;
    private Long reasonId;
    private String reasonDesc;
    private String reverseComments;
    private String apComments;
    private Double locAppliedAmt;
    private Double locPaymentAmt;
    private String address1;
    private String address2;
    private String city;
    private String suppInvoiceNo;
}