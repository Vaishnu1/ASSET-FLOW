package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "reference_email_service_db", schema = "default_references")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReferenceEmailServiceDb {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ref_es_db_id")
    private Long refEsDbId;

    @Column(name = "es_db_name")
    private String esDbName;

    @Column(name = "es_db_port")
    private Long esDbPort;

    @Column(name = "es_db_username")
    private String esDbUsername;

    @Column(name = "es_db_password")
    private String esDbPassword;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}