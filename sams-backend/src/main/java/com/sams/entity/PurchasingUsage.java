package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchasing_usage", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchasingUsage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchasing_usage_id")
    private Long purchasingUsageId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "purchasing_usage_name")
    private String purchasingUsageName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}