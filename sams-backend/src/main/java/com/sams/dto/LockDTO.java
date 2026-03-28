package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LockDTO {
    private Long orgId;
    private Long locationId;
    private Long userId;
    private String loginId;
    private Long moduleId;
    private String keyValue;
    private LocalDateTime lockTime;
}