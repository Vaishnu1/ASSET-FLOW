package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_user_location_access", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLocationAccess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_location_access_id")
    private Long userLocationAccessId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "login_id")
    private String loginId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "access_location_id")
    private Long accessLocationId;

    @Column(name = "access_location_name")
    private String accessLocationName;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}