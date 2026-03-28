package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_installation_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstallationType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "installation_type_id")
    private Long installationTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "installation_type")
    private String installationType;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}