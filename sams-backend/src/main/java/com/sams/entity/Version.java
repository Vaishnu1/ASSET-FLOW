package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_version", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Version {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "version_seq_no")
    private Long versionSeqNo;

    @Column(name = "version_name")
    private String versionName;

    @Column(name = "release_dt")
    private LocalDateTime releaseDt;

    @Column(name = "remarks")
    private String remarks;

}