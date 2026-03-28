package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_po_tc_trigger_event", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PoTcTriggerEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "po_tc_trigger_event_id")
    private Long poTcTriggerEventId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "triggent_event_name")
    private String triggentEventName;

    @Column(name = "triggent_event_type")
    private String triggentEventType;

    @Column(name = "triggent_event_at")
    private String triggentEventAt;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}