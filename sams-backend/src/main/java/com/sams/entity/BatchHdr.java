package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_batch_hdr", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BatchHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_hdr_id")
    private Long batchHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "batch_name")
    private String batchName;

    @Column(name = "reference1")
    private String reference1;

    @Column(name = "reference2")
    private String reference2;

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

    @Column(name = "active")
    private Boolean active;

}