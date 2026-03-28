package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_id")
    private Long id;

    @Column(name = "asset_name", nullable = false, length = 150)
    private String assetName;

    @Column(name = "serial_number", unique = true, length = 100)
    private String serialNumber;

    @Column(name = "asset_type", length = 100)
    private String assetType;

    @Column(name = "purchase_cost")
    private Double purchaseCost;

    @Column(name = "purchase_date")
    private LocalDateTime purchaseDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "assigned_to")
    private Employee assignedTo;

    @Column(name = "status", length = 50)
    private String status;

    @Column(name = "is_active")
    private Boolean active = true;

    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @Column(name = "created_dt", updatable = false)
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @PrePersist
    protected void onCreate() {
        createdDt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDt = LocalDateTime.now();
    }
}
