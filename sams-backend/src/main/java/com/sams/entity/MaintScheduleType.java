package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_maint_schedule_type", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintScheduleType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maint_schedule_type_id")
    private Long maintScheduleTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "maint_schedule_type_name")
    private String maintScheduleTypeName;

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