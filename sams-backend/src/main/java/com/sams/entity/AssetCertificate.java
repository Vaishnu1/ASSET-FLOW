package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_asset_certificate", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssetCertificate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "asset_certificate_id")
    private Long assetCertificateId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_id")
    private Long assetId;

    @Column(name = "certificate_id")
    private Long certificateId;

    @Column(name = "issue_date")
    private LocalDateTime issueDate;

    @Column(name = "start_date")
    private LocalDateTime startDate;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @Column(name = "file_certificate_no")
    private String fileCertificateNo;

    @Column(name = "document_no")
    private String documentNo;

    @Column(name = "content_type")
    private String contentType;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "file_path")
    private String filePath;

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