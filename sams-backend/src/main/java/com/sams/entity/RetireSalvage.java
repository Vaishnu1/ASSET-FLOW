package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "retire_salvage", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RetireSalvage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "retire_salvage_id")
    private Long retireSalvageId;

    @Column(name = "asset_retire_id")
    private Long assetRetireId;

    @Column(name = "salvage_type")
    private String salvageType;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "quantity")
    private Long quantity;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}