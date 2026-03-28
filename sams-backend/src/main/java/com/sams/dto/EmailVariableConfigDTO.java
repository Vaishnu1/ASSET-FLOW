package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EmailVariableConfigDTO {
    private Long id;
    private String processName;
    private String triggerEvent;
    private String variable1;
    private String variable2;
    private String variable3;
    private String variable4;
    private String variable5;
    private String variable6;
    private String variable7;
    private String variable8;
    private String variable9;
    private String variable10;
    private Boolean isActive;
    private LocalDateTime createdAt;
}