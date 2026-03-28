package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SourcingTypesDTO {
    private Long sourcingTypesId;
    private String sourcingTypesName;
    private Boolean active;
    private Boolean display;
}