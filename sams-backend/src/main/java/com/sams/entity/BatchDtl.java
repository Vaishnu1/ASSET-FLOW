package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_batch_dtl", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BatchDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_dtl_id")
    private Long batchDtlId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "batch_hdr_id")
    private Long batchHdrId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}