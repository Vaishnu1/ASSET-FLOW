package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "pr_unapproved_item", schema = "purchase")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrUnapprovedItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "unapproved_item_id")
    private Long unapprovedItemId;

    @Column(name = "pr_id")
    private Long prId;

    @Column(name = "pr_dtl_id")
    private Long prDtlId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "unapproved_item_name")
    private String unapprovedItemName;

    @Column(name = "unapproved_item_desc")
    private String unapprovedItemDesc;

    @Column(name = "unapproved_uom_cd")
    private String unapprovedUomCd;

    @Column(name = "item_pushed_to_org")
    private Boolean itemPushedToOrg;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}