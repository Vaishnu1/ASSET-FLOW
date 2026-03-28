package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SrActivityEfsDTO {
    private Long srActivityEfsId;
    private Long orgId;
    private String srActivityEfsName;
    private String createdBy;
    private LocalDateTime createdDt;
}