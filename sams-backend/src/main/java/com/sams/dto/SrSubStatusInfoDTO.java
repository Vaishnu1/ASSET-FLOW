package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrSubStatusInfoDTO {
    private Long srSubStatusInfoId;
    private Long orgId;
    private Long locationId;
    private String locationName;
    private Long srId;
    private String srNo;
    private Long srSubStatusId;
    private String srSubStatusName;
    private String moduleRef;
    private Boolean active;
    private Long transId;
    private String transSource;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}