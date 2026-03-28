package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_model_item_info", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrModelItemInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_model_item_id")
    private Long srModelItemId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_item_id")
    private Long modelItemId;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "item_type")
    private String itemType;

    @Column(name = "item_type_id")
    private Long itemTypeId;

    @Column(name = "uom_code")
    private String uomCode;

    @Column(name = "received_qty")
    private Double receivedQty;

    @Column(name = "consumed_qty")
    private Double consumedQty;

    @Column(name = "remaining_qty")
    private Double remainingQty;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}