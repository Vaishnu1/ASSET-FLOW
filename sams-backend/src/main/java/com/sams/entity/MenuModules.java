package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_menu_modules", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MenuModules {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "menu_module_id")
    private Long menuModuleId;

    @Column(name = "menu_id")
    private Long menuId;

    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "module_seq")
    private Long moduleSeq;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}