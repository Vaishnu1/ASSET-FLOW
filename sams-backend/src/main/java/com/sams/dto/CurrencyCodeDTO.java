package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CurrencyCodeDTO {
    private Long curId;
    private Long orgId;
    private String curCd;
    private String curName;
    private String countryName;
    private String currencyFormat;
    private String remarks;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}