package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class CityDTO {
    private Long cityId;
    private String cityName;
    private Long stateId;
    private String stateName;
    private Long countryId;
    private String countryName;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}