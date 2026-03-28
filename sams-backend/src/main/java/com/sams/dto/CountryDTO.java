package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CountryDTO {
    private Long countryId;
    private String countryName;
    private String phoneCode;
    private String currencyCd;
    private String countryCd;
    private String languageCd;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}