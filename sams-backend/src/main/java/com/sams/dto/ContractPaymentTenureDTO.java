package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ContractPaymentTenureDTO {
    private Long contractPaymentTenureId;
    private Long contractId;
    private Double paymentAmount;
    private LocalDateTime paymentDate;
    private String paymentMode;
    private String instrumentNo;
    private Long instrumentAmnt;
    private LocalDateTime instrumentDate;
    private String bankName;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}