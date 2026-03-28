package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private Long locationId;
    private String locationName;
    private Long orgId;
    private String loginId;
    private String password;
    private String userName;
    private Long employeeId;
    private String employeeCode;
    private String userType;
    private Long userTypeSrcId;
    private Long supplierId;
    private String supplierName;
    private String mobileNumber;
    private String emailId;
    private Boolean loginStatus;
    private String countryCode;
    private Boolean emailAuthenticationStatus;
    private LocalDateTime validFromDt;
    private LocalDateTime validToDt;
    private String mobileToken;
    private String fcmToken;
    private Boolean userRegisterVerification;
    private Long pwdChangeCount;
    private String token;
    private Long emailValidityStatus;
    private String otp;
    private Boolean otpSent;
    private Boolean active;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private Boolean receiveAutomatedAssetReport;
}