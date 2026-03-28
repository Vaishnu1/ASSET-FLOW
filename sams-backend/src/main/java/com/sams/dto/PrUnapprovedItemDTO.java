package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PrUnapprovedItemDTO {
    private Long unapprovedItemId;
    private Long prId;
    private Long prDtlId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String unapprovedItemName;
    private String unapprovedItemDesc;
    private String unapprovedUomCd;
    private Boolean itemPushedToOrg;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}