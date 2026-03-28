package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_db_version", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DbVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "module_name")
    private String moduleName;

    @Column(name = "module_ddl")
    private String moduleDdl;

    @Column(name = "module_dml")
    private String moduleDml;

}