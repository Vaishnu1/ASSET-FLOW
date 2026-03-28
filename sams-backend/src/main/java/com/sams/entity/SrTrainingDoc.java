package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_training_doc", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrTrainingDoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_training_doc_id")
    private Long srTrainingDocId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_training_id")
    private Long srTrainingId;

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

}