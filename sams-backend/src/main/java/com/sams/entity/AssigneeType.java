package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "assignee_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssigneeType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "assignee_type_id")
    private Long assigneeTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "assignee_type")
    private String assigneeType;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_by")
    private String updatedBy;

}