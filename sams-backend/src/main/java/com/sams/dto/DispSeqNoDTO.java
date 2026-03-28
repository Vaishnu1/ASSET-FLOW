package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DispSeqNoDTO {
    private Long dispSeqNoId;
    private Long orgId;
    private Long seqNo;
    private String createdBy;
    private LocalDateTime createdDt;
}