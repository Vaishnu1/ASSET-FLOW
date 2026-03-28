package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_sender_id_query", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailSenderIdQuery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "esid")
    private Long esid;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "keyword")
    private String keyword;

    @Column(name = "sqlq")
    private String sqlq;

    @Column(name = "no_of_parameters")
    private Long noOfParameters;

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