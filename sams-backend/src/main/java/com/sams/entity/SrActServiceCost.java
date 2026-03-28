package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_act_service_cost", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrActServiceCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_act_service_cost_id")
    private Long srActServiceCostId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_activity_id")
    private Long srActivityId;

    @Column(name = "service_type")
    private String serviceType;

    @Column(name = "service_spare_desc")
    private String serviceSpareDesc;

    @Column(name = "uom")
    private String uom;

    @Column(name = "unit_price")
    private Double unitPrice;

    @Column(name = "qty")
    private Double qty;

    @Column(name = "total_cost")
    private Double totalCost;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_serial_no")
    private String itemSerialNo;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}