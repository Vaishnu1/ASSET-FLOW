package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchase_tc_template_hdr", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseTcTemplateHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tc_template_hdr_id")
    private Long tcTemplateHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "process_name")
    private String processName;

    @Column(name = "template_name")
    private String templateName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}