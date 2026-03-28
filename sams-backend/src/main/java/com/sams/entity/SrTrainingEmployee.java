package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_training_employee", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrTrainingEmployee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_training_emp_id")
    private Long srTrainingEmpId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_training_id")
    private Long srTrainingId;

    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}