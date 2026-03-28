package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_user", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "password")
    private String password;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "employee_code")
    private String employeeCode;

    @Column(name = "user_type")
    private String userType;

    @Column(name = "user_type_src_id")
    private Long userTypeSrcId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_name")
    private String supplierName;

    @Column(name = "mobile_number")
    private String mobileNumber;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "login_status")
    private Boolean loginStatus;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "email_authentication_status")
    private Boolean emailAuthenticationStatus;

    @Column(name = "valid_from_dt")
    private LocalDateTime validFromDt;

    @Column(name = "valid_to_dt")
    private LocalDateTime validToDt;

    @Column(name = "mobile_token")
    private String mobileToken;

    @Column(name = "fcm_token")
    private String fcmToken;

    @Column(name = "user_register_verification")
    private Boolean userRegisterVerification;

    @Column(name = "pwd_change_count")
    private Long pwdChangeCount;

    @Column(name = "token")
    private String token;

    @Column(name = "email_validity_status")
    private Long emailValidityStatus;

    @Column(name = "otp")
    private String otp;

    @Column(name = "otp_sent")
    private Boolean otpSent;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "receive_automated_asset_report")
    private Boolean receiveAutomatedAssetReport;

}