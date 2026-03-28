package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class RejectReasonDTO {
    private Long rejectReasonId;
    private String rejectReason;
}