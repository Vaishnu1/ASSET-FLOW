package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_item_branch_mapping", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemBranchMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_branch_id")
    private Long itemBranchId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "loc_id")
    private Long locId;

    @Column(name = "m_item_id")
    private Long itemId;

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