package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_customer_site_location_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSiteLocationAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_site_access_id")
    private Long customerSiteAccessId;

    @Column(name = "customer_site_id")
    private Long customerSiteId;

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