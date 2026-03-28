package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class GrnForDTO {
    private Long grnForId;
    private Long orgId;
    private String grnFor;
    private String createdBy;
    private LocalDateTime createdDt;
}