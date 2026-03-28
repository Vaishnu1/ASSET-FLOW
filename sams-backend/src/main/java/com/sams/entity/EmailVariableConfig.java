package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_variable_config", schema = "public")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailVariableConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "process_name")
    private String processName;

    @Column(name = "trigger_event")
    private String triggerEvent;

    @Column(name = "variable1")
    private String variable1;

    @Column(name = "variable2")
    private String variable2;

    @Column(name = "variable3")
    private String variable3;

    @Column(name = "variable4")
    private String variable4;

    @Column(name = "variable5")
    private String variable5;

    @Column(name = "variable6")
    private String variable6;

    @Column(name = "variable7")
    private String variable7;

    @Column(name = "variable8")
    private String variable8;

    @Column(name = "variable9")
    private String variable9;

    @Column(name = "variable10")
    private String variable10;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

}