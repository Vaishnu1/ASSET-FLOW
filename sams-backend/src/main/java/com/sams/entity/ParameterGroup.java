package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_parameter_group", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParameterGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "parameter_group_id")
    private Long parameterGroupId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "parameter_group_name")
    private String parameterGroupName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "org_name")
    private String orgName;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}