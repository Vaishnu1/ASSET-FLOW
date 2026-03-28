package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_attribute_3", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrAttribute3 {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_attribute_id_3")
    private Long srAttributeId3;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "attribute_3_name")
    private String attribute3Name;

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