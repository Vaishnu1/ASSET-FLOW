package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "manufacturer_supplier", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManufacturerSupplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manufacturer_supplier_id")
    private Long manufacturerSupplierId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "manufacturer_id")
    private Long manufacturerId;

    @Column(name = "supplier_id")
    private Long supplierId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

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