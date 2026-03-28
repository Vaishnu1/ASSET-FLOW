package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_department", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private Long id;

    @Column(name = "department_name", nullable = false, unique = true, length = 100)
    private String departmentName;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "is_active")
    private Boolean active = true;

    @Column(name = "created_by", updatable = false)
    private String createdBy;

    @Column(name = "created_dt", updatable = false)
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @PrePersist
    protected void onCreate() {
        createdDt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedDt = LocalDateTime.now();
    }
}
