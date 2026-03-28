package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "model_doc", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ModelDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "model_doc_id")
    private Long modelDocId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "doc_name")
    private String docName;

    @Column(name = "doc_type")
    private String docType;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "content_type")
    private String contentType;

}