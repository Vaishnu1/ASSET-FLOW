package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_prefernce", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPrefernce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_prefernce_id")
    private Long userPrefernceId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "module_key")
    private String moduleKey;

    @Column(name = "custom_columns")
    private String customColumns;

    @Column(name = "custom_filters")
    private String customFilters;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}