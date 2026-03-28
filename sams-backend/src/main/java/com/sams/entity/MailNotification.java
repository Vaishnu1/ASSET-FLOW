package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_mail_notification", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MailNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "mail_notification_id")
    private Long mailNotificationId;

    @Column(name = "main_process_id")
    private Long mainProcessId;

    @Column(name = "sub_process_id")
    private Long subProcessId;

    @Column(name = "sub_process_name")
    private String subProcessName;

    @Column(name = "main_process_name")
    private String mainProcessName;

    @Column(name = "to_email")
    private String toEmail;

    @Column(name = "cc_email")
    private String ccEmail;

    @Column(name = "bcc_email")
    private String bccEmail;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "active")
    private String active;

    @Column(name = "active_disp")
    private Boolean activeDisp;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "location_name")
    private String locationName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}