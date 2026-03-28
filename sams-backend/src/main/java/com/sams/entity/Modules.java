package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_modules", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Modules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "module_key")
    private String moduleKey;

    @Column(name = "module_desc")
    private String moduleDesc;

    @Column(name = "module_type")
    private String moduleType;

    @Column(name = "module_group_name")
    private String moduleGroupName;

    @Column(name = "module_local_name")
    private String moduleLocalName;

    @Column(name = "icon_cls")
    private String iconCls;

    @Column(name = "parent_module_id")
    private Long parentModuleId;

    @Column(name = "module_path")
    private String modulePath;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}