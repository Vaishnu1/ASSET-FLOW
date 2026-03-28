package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_escalation", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrEscalation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "escalation_sr_id")
    private Long escalationSrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "sr_type")
    private String srType;

    @Column(name = "from_status_id")
    private Long fromStatusId;

    @Column(name = "to_status_id")
    private Long toStatusId;

    @Column(name = "allowed_minutes")
    private Long allowedMinutes;

    @Column(name = "to_email_ids")
    private String toEmailIds;

    @Column(name = "cc_email_ids")
    private String ccEmailIds;

    @Column(name = "bcc_email_ids")
    private String bccEmailIds;

    @Column(name = "notification_types")
    private String notificationTypes;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}