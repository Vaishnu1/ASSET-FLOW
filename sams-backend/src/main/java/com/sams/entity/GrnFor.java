package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_grn_for", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GrnFor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grn_for_id")
    private Long grnForId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "grn_for")
    private String grnFor;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}