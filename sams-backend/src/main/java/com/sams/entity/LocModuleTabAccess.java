package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_loc_module_tab_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocModuleTabAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_module_tab_access_id")
    private Long locModuleTabAccessId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "module_name")
    private String moduleName;

    @Column(name = "tab_name")
    private String tabName;

    @Column(name = "tab_display_name")
    private String tabDisplayName;

    @Column(name = "is_enabled")
    private Boolean isEnabled;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}