package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_employee_skill", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_skill_id")
    private Long employeeSkillId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "skill_name")
    private String skillName;

    @Column(name = "no_of_years")
    private Double noOfYears;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "level")
    private Long level;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}