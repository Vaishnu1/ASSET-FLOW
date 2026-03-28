package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_pre_inw_status", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PreInwStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pre_inw_status_id")
    private Long preInwStatusId;

    @Column(name = "pre_inw_status_code")
    private Long preInwStatusCode;

    @Column(name = "pre_inw_status_desc")
    private String preInwStatusDesc;

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