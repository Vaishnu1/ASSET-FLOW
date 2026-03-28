package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "request_job_info", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestJobInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "request_id")
    private Long requestId;

    @Column(name = "request_no")
    private String requestNo;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "program_name")
    private String programName;

    @Column(name = "file_path_url")
    private String filePathUrl;

    @Column(name = "request_status")
    private Long requestStatus;

    @Column(name = "error_log")
    private String errorLog;

    @Column(name = "requested_by")
    private String requestedBy;

    @Column(name = "request_dt")
    private LocalDateTime requestDt;

    @Column(name = "request_end_dt")
    private LocalDateTime requestEndDt;

    @Column(name = "user_id")
    private Long userId;

}