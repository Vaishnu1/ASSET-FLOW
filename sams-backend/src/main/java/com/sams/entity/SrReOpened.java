package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_re_opened", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrReOpened {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_re_opened_id")
    private Long srReOpenedId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "re_opened_by_id")
    private Long reOpenedById;

    @Column(name = "re_opened_by")
    private String reOpenedBy;

    @Column(name = "re_opened_dt")
    private LocalDateTime reOpenedDt;

    @Column(name = "re_opened_remarks")
    private String reOpenedRemarks;

    @Column(name = "re_opened_completed_dt")
    private LocalDateTime reOpenedCompletedDt;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}