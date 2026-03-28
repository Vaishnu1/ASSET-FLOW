package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_loc_sub_department", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocSubDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_sub_dept_id")
    private Long locSubDeptId;

    @Column(name = "loc_sub_dept_name")
    private String locSubDeptName;

    @Column(name = "sub_dept_id")
    private Long subDeptId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "loc_department_id")
    private Long locDepartmentId;

    @Column(name = "block_id")
    private Long blockId;

    @Column(name = "floor_id")
    private Long floorId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "segment_id")
    private Long segmentId;

    @Column(name = "incharge_id")
    private Long inchargeId;

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