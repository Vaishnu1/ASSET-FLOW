package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_maintenance_strategy", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MaintenanceStrategy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maintenance_strategy_id")
    private Long maintenanceStrategyId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "maintenance_strategy_name")
    private String maintenanceStrategyName;

    @Column(name = "maintenance_strategy_type")
    private String maintenanceStrategyType;

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