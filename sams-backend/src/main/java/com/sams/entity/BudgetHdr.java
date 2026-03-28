package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "budget_hdr", schema = "budget")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "budget_hdr_id")
    private Long budgetHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "budget_name")
    private String budgetName;

    @Column(name = "budget_status")
    private String budgetStatus;

    @Column(name = "fy_start_month")
    private Long fyStartMonth;

    @Column(name = "fy_end_month")
    private Long fyEndMonth;

    @Column(name = "cur_cd")
    private String curCd;

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