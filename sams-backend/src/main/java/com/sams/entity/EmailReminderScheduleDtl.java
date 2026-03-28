package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_reminder_schedule_dtl", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailReminderScheduleDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_reminder_schedule_dtl_id")
    private Long emailReminderScheduleDtlId;

    @Column(name = "email_reminder_schedule_hdr_id")
    private Long emailReminderScheduleHdrId;

    @Column(name = "trans_id")
    private Long transId;

    @Column(name = "number_of_days")
    private Long numberOfDays;

    @Column(name = "reminder_type")
    private String reminderType;

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

}