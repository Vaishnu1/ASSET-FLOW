package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_lock", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Lock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "module_id")
    private Long moduleId;

    @Column(name = "key_value")
    private String keyValue;

    @Column(name = "lock_time")
    private LocalDateTime lockTime;

}