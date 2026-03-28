package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_org", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Org {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "org_code")
    private String orgCode;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "alt_phone_number")
    private String altPhoneNumber;

    @Column(name = "address1")
    private String address1;

    @Column(name = "address2")
    private String address2;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "email_id")
    private String emailId;

    @Column(name = "web_url")
    private String webUrl;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "date_format")
    private String dateFormat;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "logo_path")
    private String logoPath;

    @Column(name = "sms_sender_user_name")
    private String smsSenderUserName;

    @Column(name = "sms_sender_password")
    private String smsSenderPassword;

    @Column(name = "sms_sender_id")
    private String smsSenderId;

    @Column(name = "sms_sender_url")
    private String smsSenderUrl;

    @Column(name = "smtp_port_number")
    private Long smtpPortNumber;

    @Column(name = "smtp_server_name")
    private String smtpServerName;

    @Column(name = "pop_server_name")
    private String popServerName;

    @Column(name = "pop_account_id")
    private String popAccountId;

    @Column(name = "pop_account_pwd")
    private String popAccountPwd;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "firebase_access_token")
    private String firebaseAccessToken;

}