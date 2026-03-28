package com.sams.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class LocationDTO {
    private Long locationId;
    private Long orgId;
    private Long legalEntityId;
    private String locationName;
    private String locationType;
    private String locationCode;
    private String locShortName;
    private String curCd;
    private String contactPersonName;
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
    private Long smtpPortNumber;
    private String smtpServerAddr;
    private String fromEmailAddr;
    private String smtpAccountId;
    private String smtpAccountPwd;
    private String fieldLabelFilePath;
    private String fieldLabelLanguage;
    private String languageCode;
    private Long regionId;
    private String dateFormat;
    private Boolean enableCustomerEntry;
    private Long userSessionTimeOut;
    private String fyStartMonth;
    private String fyEndMonth;
    private Boolean active;
    private Boolean checkAttendanceForAsignEng;
    private Long defaultSrNotifyUser;
    private Long serviceTypeId;
    private String createdBy;
    private LocalDateTime createdDt;
    private String updatedBy;
    private LocalDateTime updatedDt;
    private String locAttribute1;
    private String locAttribute2;
    private String bookValueCalcType;
}