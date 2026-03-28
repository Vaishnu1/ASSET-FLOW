package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_loc_department", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocDepartment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_department_id")
    private Long locDepartmentId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "department_name")
    private String departmentName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "designation")
    private String designation;

    @Column(name = "incharge_name")
    private String inchargeName;

    @Column(name = "designation_id")
    private Long designationId;

    @Column(name = "incharge_id")
    private Long inchargeId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "block_id")
    private Long blockId;

    @Column(name = "floor_id")
    private Long floorId;

    @Column(name = "room_id")
    private Long roomId;

    @Column(name = "segment_id")
    private Long segmentId;

}