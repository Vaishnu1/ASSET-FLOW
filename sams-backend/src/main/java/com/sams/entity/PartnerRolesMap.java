package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_partner_roles_map", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PartnerRolesMap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "partner_roles_map_id")
    private Long partnerRolesMapId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "business_partner_id")
    private Long businessPartnerId;

    @Column(name = "business_partner_role_id")
    private Long businessPartnerRoleId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}