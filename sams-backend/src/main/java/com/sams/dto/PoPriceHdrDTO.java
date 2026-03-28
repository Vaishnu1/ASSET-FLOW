package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class PoPriceHdrDTO {
    private Long poPriceHdrId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private String poPriceName;
    private String poPriceDesc;
    private String curCd;
    private LocalDateTime effcFromDt;
    private LocalDateTime effcToDt;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}