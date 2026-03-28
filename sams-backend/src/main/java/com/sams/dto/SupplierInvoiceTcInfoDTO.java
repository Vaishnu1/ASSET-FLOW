package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierInvoiceTcInfoDTO {
    private Long supplierInvoiceTcInfoId;
    private Long poHdrId;
    private Long supplierInvoiceHdrId;
    private Long tcTemplateHdrId;
    private Long tcParameterId;
    private String tcParameterName;
    private Long displaySequenceNo;
    private Long tcParameterChildId;
    private String tcParameterChildName;
    private String selEnteredValues;
    private String remarks;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}