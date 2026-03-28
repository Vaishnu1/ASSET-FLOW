package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "budget_capex_dtl", schema = "budget")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetCapexDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_capex_dtl_id")
    private Long budgetCapexDtlId;

    @Column(name = "budget_dtl_id")
    private Long budgetDtlId;

    @Column(name = "model_name")
    private Long modelName;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "qty")
    private Double qty;

    @Column(name = "procrument_type")
    private String procrumentType;

    @Column(name = "procrument_reason")
    private String procrumentReason;

    @Column(name = "cur_cd")
    private String curCd;

    @Column(name = "actual_spent_amount")
    private Double actualSpentAmount;

    @Column(name = "asset_group_name")
    private String assetGroupName;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "budget_amount")
    private Double budgetAmount;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}