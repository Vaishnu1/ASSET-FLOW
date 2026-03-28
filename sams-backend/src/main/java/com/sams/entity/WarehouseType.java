package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_warehouse_type", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WarehouseType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "warehouse_type_id")
    private Long warehouseTypeId;

    @Column(name = "warehouse_type_name")
    private String warehouseTypeName;

    @Column(name = "warehouse_type_desc")
    private String warehouseTypeDesc;

    @Column(name = "active")
    private String active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}