package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_uom", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Uom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uom_id")
    private Long uomId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "uom_code")
    private String uomCode;

    @Column(name = "uom_desc")
    private String uomDesc;

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