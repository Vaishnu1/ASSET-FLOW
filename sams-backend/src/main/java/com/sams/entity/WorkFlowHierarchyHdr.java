package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_flow_hierarchy_hdr", schema = "workflow")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlowHierarchyHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "work_flow_hierarchy_hdr_id")
    private Long workFlowHierarchyHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "process_name")
    private String processName;

    @Column(name = "work_flow_name")
    private String workFlowName;

    @Column(name = "work_flow_desc_id")
    private Long workFlowDescId;

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