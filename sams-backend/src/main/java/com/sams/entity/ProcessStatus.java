package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_process_status", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProcessStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "process_status_id")
    private Long processStatusId;

    @Column(name = "process_status_name")
    private String processStatusName;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "process_name")
    private String processName;

    @Column(name = "seq_process_status_id")
    private Long seqProcessStatusId;

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