package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_reject_reason", schema = "inventory")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RejectReason {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reject_reason_id")
    private Long rejectReasonId;

    @Column(name = "reject_reason")
    private String rejectReason;

}