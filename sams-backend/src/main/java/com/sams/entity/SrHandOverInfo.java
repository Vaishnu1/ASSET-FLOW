package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_hand_over_info", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrHandOverInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_hand_over_id")
    private Long srHandOverId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "handover_item_type")
    private String handoverItemType;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "hand_over_remarks")
    private String handOverRemarks;

    @Column(name = "hand_over_dt")
    private LocalDateTime handOverDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}