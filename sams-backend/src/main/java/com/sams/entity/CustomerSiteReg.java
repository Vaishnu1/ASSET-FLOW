package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_customer_site_reg", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerSiteReg {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_site_reg_id")
    private Long customerSiteRegId;

    @Column(name = "registration_name")
    private String registrationName;

    @Column(name = "registration_no")
    private String registrationNo;

    @Column(name = "customer_site_id")
    private Long customerSiteId;

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