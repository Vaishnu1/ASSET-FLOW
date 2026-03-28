package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class OrderReasonDTO {
    private Long orderReasonId;
    private String orderReasonName;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
}