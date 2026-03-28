package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_status", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_status_id")
    private Long srStatusId;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_activity_id")
    private Long srActivityId;

    @Column(name = "sr_status")
    private String srStatus;

    @Column(name = "latitude")
    private Double latitude;

    @Column(name = "longitude")
    private Double longitude;

    @Column(name = "address")
    private String address;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}