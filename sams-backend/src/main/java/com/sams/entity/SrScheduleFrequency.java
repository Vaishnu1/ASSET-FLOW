package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_schedule_frequency", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrScheduleFrequency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_schedule_frequency_id")
    private Long srScheduleFrequencyId;

    @Column(name = "frequency_id")
    private String frequencyId;

    @Column(name = "frequency_name")
    private String frequencyName;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "active")
    private Boolean active;

}