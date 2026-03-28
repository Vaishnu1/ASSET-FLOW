package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EndUserDTO {
    private Long endUserId;
    private Long orgId;
    private String endUserName;
    private String mobileNumber;
    private String userVerificationOtp;
    private Boolean userVerified;
    private String createdBy;
    private LocalDateTime createdDt;
}