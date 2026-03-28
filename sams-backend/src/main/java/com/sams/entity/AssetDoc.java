package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "asset_doc", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_doc_id")
    private Long assetDocId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_hdr_id")
    private Long assetHdrId;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_type")
    private String docType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "start_dt")
    private LocalDateTime startDt;

    @Column(name = "expiry_dt")
    private LocalDateTime expiryDt;

    @Column(name = "from_source")
    private String fromSource;

}