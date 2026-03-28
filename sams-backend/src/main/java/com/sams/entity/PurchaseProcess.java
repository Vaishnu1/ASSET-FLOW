package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchase_process", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseProcess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "purchase_process_id")
    private Long purchaseProcessId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "purchase_process_name")
    private String purchaseProcessName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}