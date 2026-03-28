package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "budget_dtl", schema = "budget")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_dtl_id")
    private Long budgetDtlId;

    @Column(name = "budget_hdr_id")
    private Long budgetHdrId;

    @Column(name = "budget_item")
    private String budgetItem;

    @Column(name = "budget_amount")
    private Double budgetAmount;

    @Column(name = "actual_spent_amount")
    private Double actualSpentAmount;

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