package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_supplier_site_reg", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierSiteReg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "supplier_site_reg_id")
    private Long supplierSiteRegId;

    @Column(name = "registration_name")
    private String registrationName;

    @Column(name = "registration_no")
    private String registrationNo;

    @Column(name = "supplier_site_id")
    private String supplierSiteId;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}