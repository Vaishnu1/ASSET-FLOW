package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_activity_correct_actions", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrActivityCorrectActions {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_activity_correct_actions_id")
    private Long srActivityCorrectActionsId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_activity_correct_actions_name")
    private String srActivityCorrectActionsName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}