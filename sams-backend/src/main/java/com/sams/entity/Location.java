package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_location", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "legal_entity_id")
    private Long legalEntityId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "location_type")
    private String locationType;

    @Column(name = "location_code")
    private String locationCode;

    @Column(name = "loc_short_name")
    private String locShortName;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "contact_person_name")
    private String contactPersonName;

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

    @Column(name = "smtp_port_number")
    private Long smtpPortNumber;

    @Column(name = "smtp_server_addr")
    private String smtpServerAddr;

    @Column(name = "from_email_addr")
    private String fromEmailAddr;

    @Column(name = "smtp_account_id")
    private String smtpAccountId;

    @Column(name = "smtp_account_pwd")
    private String smtpAccountPwd;

    @Column(name = "field_label_file_path")
    private String fieldLabelFilePath;

    @Column(name = "field_label_language")
    private String fieldLabelLanguage;

    @Column(name = "language_code")
    private String languageCode;

    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "date_format")
    private String dateFormat;

    @Column(name = "enable_customer_entry")
    private Boolean enableCustomerEntry;

    @Column(name = "user_session_time_out")
    private Long userSessionTimeOut;

    @Column(name = "fy_start_month")
    private String fyStartMonth;

    @Column(name = "fy_end_month")
    private String fyEndMonth;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "check_attendance_for_asign_eng")
    private Boolean checkAttendanceForAsignEng;

    @Column(name = "default_sr_notify_user")
    private Long defaultSrNotifyUser;

    @Column(name = "service_type_id")
    private Long serviceTypeId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "loc_attribute1")
    private String locAttribute1;

    @Column(name = "loc_attribute2")
    private String locAttribute2;

    @Column(name = "book_value_calc_type")
    private String bookValueCalcType;

}