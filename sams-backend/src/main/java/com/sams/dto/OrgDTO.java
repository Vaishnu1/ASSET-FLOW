package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class OrgDTO {
    private Long orgId;
    private String orgName;
    private String orgCode;
    private String phoneNumber;
    private String altPhoneNumber;
    private String address1;
    private String address2;
    private String city;
    private String state;
    private String country;
    private String pincode;
    private String emailId;
    private String webUrl;
    private String curCd;
    private String countryCode;
    private String dateFormat;
    private Boolean active;
    private String logoPath;
    private String smsSenderUserName;
    private String smsSenderPassword;
    private String smsSenderId;
    private String smsSenderUrl;
    private Long smtpPortNumber;
    private String smtpServerName;
    private String popServerName;
    private String popAccountId;
    private String popAccountPwd;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String firebaseAccessToken;
}