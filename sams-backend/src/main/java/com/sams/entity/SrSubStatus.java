package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_sub_status", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrSubStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_sub_status_id")
    private Long srSubStatusId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_sub_status_name")
    private String srSubStatusName;

    @Column(name = "module_ref")
    private String moduleRef;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}