package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_maintenance", schema = "dashboard")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetMaintenance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_maintenance_id")
    private Long assetMaintenanceId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_category_id")
    private Long assetCategoryId;

    @Column(name = "asset_category_name")
    private String assetCategoryName;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "asset_sub_category_name")
    private String assetSubCategoryName;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "open_service_requests")
    private Long openServiceRequests;

    @Column(name = "open_bm_requests")
    private Long openBmRequests;

    @Column(name = "open_critical_bm_requests")
    private Long openCriticalBmRequests;

    @Column(name = "missed_pm_requests")
    private Long missedPmRequests;

    @Column(name = "missed_pa_requests")
    private Long missedPaRequests;

    @Column(name = "top_affected_subcategory")
    private String topAffectedSubcategory;

    @Column(name = "top_affected_breakdown_count")
    private Long topAffectedBreakdownCount;

    @Column(name = "summary_month")
    private LocalDateTime summaryMonth;

    @Column(name = "bm_ageing_json")
    private String bmAgeingJson;

    @Column(name = "recurring_breakdowns")
    private String recurringBreakdowns;

    @Column(name = "maintenance_cost_breakdown")
    private String maintenanceCostBreakdown;

    @Column(name = "exceeding_sla_for_bm")
    private String exceedingSlaForBm;

    @Column(name = "mttr_distribution")
    private String mttrDistribution;

    @Column(name = "mtbf_distribution")
    private String mtbfDistribution;

}