package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_custom_display_group", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomDisplayGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "custom_display_group_id")
    private Long customDisplayGroupId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "display_group")
    private String displayGroup;

    @Column(name = "color")
    private String color;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}