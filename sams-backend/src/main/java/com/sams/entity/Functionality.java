package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_functionality", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Functionality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "functionality_id")
    private Long functionalityId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "functionality_name")
    private String functionalityName;

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