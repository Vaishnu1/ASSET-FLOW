package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_sr_status", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailSrStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "status_name")
    private String statusName;

    @Column(name = "active")
    private Boolean active;

}