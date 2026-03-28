package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class WareHouseDTO {
    private Long id;
    private Long locationId;
    private String locationName;
    private Long wareHouseId;
    private String wareHouseCode;
    private String description;
    private Boolean active;
    private String createdBy;
    private String createdDtDisp;
    private String updatedBy;
    private String updatedDtDisp;
    private String orgName;
}