package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_temporary_assignee", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetTemporaryAssignee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_temporary_assignee_id")
    private Long assetTemporaryAssigneeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "from_assignee_id")
    private Long fromAssigneeId;

    @Column(name = "to_assignee_id")
    private Long toAssigneeId;

    @Column(name = "default_person_incharge")
    private Boolean defaultPersonIncharge;

    @Column(name = "vl_old_qty")
    private Long vlOldQty;

    @Column(name = "vl_new_qty")
    private Long vlNewQty;

    @Column(name = "end_dt")
    private LocalDateTime endDt;

    @Column(name = "assignee_type_id")
    private Long assigneeTypeId;

    @Column(name = "update_flag")
    private Boolean updateFlag;

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

    @Column(name = "primary_technician")
    private Boolean primaryTechnician;

    @Column(name = "secondary_technician")
    private Boolean secondaryTechnician;

}