package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_emp_loc", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpLoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "emp_loc_id")
    private Long empLocId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "employee_code")
    private String employeeCode;

    @Column(name = "access_loc_id")
    private Long accessLocId;

    @Column(name = "access_loc_name")
    private String accessLocName;

    @Column(name = "default_location")
    private Boolean defaultLocation;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}