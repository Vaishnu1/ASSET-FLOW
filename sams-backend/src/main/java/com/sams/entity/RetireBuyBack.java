package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "retire_buy_back", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RetireBuyBack {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "retire_buy_back_id")
    private Long retireBuyBackId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_retire_id")
    private Long assetRetireId;

    @Column(name = "buy_back_model_id")
    private Long buyBackModelId;

    @Column(name = "buy_back_remarks")
    private String buyBackRemarks;

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