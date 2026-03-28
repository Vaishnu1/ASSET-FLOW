package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_business_partner_roles", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BusinessPartnerRoles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_partner_role_id")
    private Long businessPartnerRoleId;

    @Column(name = "business_partner_role_name")
    private String businessPartnerRoleName;

    @Column(name = "remarks")
    private String remarks;

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