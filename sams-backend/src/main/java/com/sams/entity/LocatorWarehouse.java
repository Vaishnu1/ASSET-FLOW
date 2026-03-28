package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_locator_warehouse", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocatorWarehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "locator_name")
    private String locatorName;

    @Column(name = "locator_id")
    private Long locatorId;

    @Column(name = "dimension")
    private String dimension;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "warehouse_id")
    private Long warehouseId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}