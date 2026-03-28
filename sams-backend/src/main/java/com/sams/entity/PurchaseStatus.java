package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "purchase_status", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_status_id")
    private Long purchaseStatusId;

    @Column(name = "purchase_status_name")
    private String purchaseStatusName;

    @Column(name = "source_module")
    private String sourceModule;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}