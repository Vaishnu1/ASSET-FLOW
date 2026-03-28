package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RcvDtlDTO {
    private Long rcvDtlId;
    private Long rcvHdrId;
    private Long rcvLineNo;
    private String suppCd;
    private Long poId;
    private String poNo;
    private Long poLineId;
    private Long poLineNo;
    private Long requisitionId;
    private String requisitionNo;
    private Long requisitionLineId;
    private Long requisitionLineNo;
    private String refNo;
    private Long itemId;
    private String uomCd;
    private String itemCd;
    private String lotControlFlag;
    private Double unitPrice;
    private Double transferCost;
    private Double transportationCost;
    private String dropShip;
    private Double rcvQty;
    private Double oldRcvQty;
    private Double acceptQty;
    private Double oldAcceptQty;
    private Double rejectQty;
    private Double oldRejectQty;
    private Long rejectReasonId;
    private Double poQty;
    private Double poBalQty;
    private LocalDateTime reqDt;
    private String invStatus;
    private Long whId;
    private String whCd;
    private String supplierLotNo;
    private Long locatorId;
    private String locatorCd;
    private String comments;
    private String countryOfOriginCd;
    private String barCodeLabel;
    private String projectCode;
    private Long jobOrderId;
    private String replacement;
    private Long poDtlId;
    private String itemDesc;
    private String woNumber;
}