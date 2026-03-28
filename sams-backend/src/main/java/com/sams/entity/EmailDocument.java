package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_document", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_message_doc_id")
    private Long emailMessageDocId;

    @Column(name = "email_message_id")
    private Long emailMessageId;

    @Column(name = "file_id")
    private Long fileId;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}