package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserSessionInfoDTO {
    private Long sessionId;
    private Long orgId;
    private Long locationId;
    private String loginId;
    private String sessionIp;
    private LocalDateTime loginTime;
    private LocalDateTime logoutTime;
    private String loginResult;
    private String remarks;
    private String sessionToken;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
}