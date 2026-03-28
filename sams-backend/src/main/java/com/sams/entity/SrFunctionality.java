package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_sr_functionality", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrFunctionality {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "functionality_id")
    private Long functionalityId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "functionality_name")
    private String functionalityName;

}