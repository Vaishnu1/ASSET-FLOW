package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_store_loc_access", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreLocAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_loc_id")
    private Long storeLocId;

    @Column(name = "store_id")
    private Long storeId;

    @Column(name = "access_loc_id")
    private Long accessLocId;

    @Column(name = "access_loc_name")
    private String accessLocName;

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

    @Column(name = "org_id")
    private Long orgId;

}