package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_group_module_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupModuleAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_access_id")
    private Long groupAccessId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "group_id")
    private Long groupId;

    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "create_flg")
    private String createFlg;

    @Column(name = "read_flg")
    private String readFlg;

    @Column(name = "update_flg")
    private String updateFlg;

    @Column(name = "delete_flg")
    private String deleteFlg;

    @Column(name = "export_flg")
    private String exportFlg;

    @Column(name = "import_flg")
    private String importFlg;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}