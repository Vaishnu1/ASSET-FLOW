package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_disp_seq_no", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DispSeqNo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "disp_seq_no_id")
    private Long dispSeqNoId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "seq_no")
    private Long seqNo;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}