package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_loc_registration", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LocRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "loc_registration_id")
    private Long locRegistrationId;

    @Column(name = "registration_name")
    private String registrationName;

    @Column(name = "registration_no")
    private String registrationNo;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}