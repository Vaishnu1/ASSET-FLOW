package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_parameter_type", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParameterType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "parameter_type_id")
    private Long parameterTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "parameter_type_name")
    private String parameterTypeName;

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

    @Column(name = "parameter_type_name_disp")
    private String parameterTypeNameDisp;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}