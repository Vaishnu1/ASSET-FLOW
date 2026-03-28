package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrFunctionalityDTO {
    private Long functionalityId;
    private Long orgId;
    private String functionalityName;
}