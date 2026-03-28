package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_item_loc_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemLocAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_loc_access_id")
    private Long itemLocAccessId;

    @Column(name = "item_id")
    private Long itemId;

    @Column(name = "access_loc_id")
    private Long accessLocId;

    @Column(name = "access_loc_name")
    private String accessLocName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}