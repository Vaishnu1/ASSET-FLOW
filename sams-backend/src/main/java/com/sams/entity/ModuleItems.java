package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_module_items", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModuleItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_item_id")
    private Long moduleItemId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "module_id")
    private Long moduleId;

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