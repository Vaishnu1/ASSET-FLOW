package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_user_group_mapping", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_group_mapping_id")
    private Long userGroupMappingId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "user_group_id")
    private Long userGroupId;

    @Column(name = "user_group_name")
    private String userGroupName;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "active")
    private Boolean active;

}