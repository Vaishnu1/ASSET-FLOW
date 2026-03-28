package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CustFieldDtlDTO {
    private Long id;
    private Long customDtlId;
    private Long customHdrId;
    private String customValues;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String updatedDtDisp;
    private String createdDtDisp;
}