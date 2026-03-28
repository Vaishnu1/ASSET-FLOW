package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchasing_type", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchasingType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchasing_type_id")
    private Long purchasingTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "purchasing_type_name")
    private String purchasingTypeName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "module")
    private String module;

}