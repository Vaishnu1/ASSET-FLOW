package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_type", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_type_id")
    private Long srTypeId;

    @Column(name = "sr_id")
    private String srId;

    @Column(name = "sr_type_name")
    private String srTypeName;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "for_schedule_maintenance")
    private Boolean forScheduleMaintenance;

}