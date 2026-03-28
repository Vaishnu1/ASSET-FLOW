package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_tat_temp", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrTatTemp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_tat_temp_id")
    private Long srTatTempId;

    @Column(name = "status")
    private String status;

    @Column(name = "from_date")
    private LocalDateTime fromDate;

    @Column(name = "to_dates")
    private LocalDateTime toDates;

    @Column(name = "time_diff")
    private LocalDateTime timeDiff;

    @Column(name = "time_diff_hrs")
    private LocalDateTime timeDiffHrs;

}