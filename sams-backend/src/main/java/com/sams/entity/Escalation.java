package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_escalation", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Escalation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "escalation_id")
    private Long escalationId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "escalation_type")
    private String escalationType;

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