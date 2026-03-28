package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_maint_schedule_frequency", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintScheduleFrequency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maint_schedule_frequncy_id")
    private Long maintScheduleFrequncyId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "maint_schedule_frequency_name")
    private String maintScheduleFrequencyName;

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