package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier_site_location_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierSiteLocationAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_site_access_id")
    private Long supplierSiteAccessId;

    @Column(name = "supplier_site_id")
    private Long supplierSiteId;

    @Column(name = "access_location_id")
    private Long accessLocationId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}