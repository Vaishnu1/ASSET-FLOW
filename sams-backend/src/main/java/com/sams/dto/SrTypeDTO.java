package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrTypeDTO {
    private Long srTypeId;
    private String srId;
    private String srTypeName;
    private Long orgId;
    private Boolean active;
    private Boolean forScheduleMaintenance;
}