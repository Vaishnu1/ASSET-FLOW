package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sms_message_hdr", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SmsMessageHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sms_message_hdr_id")
    private Long smsMessageHdrId;

    @Column(name = "priority")
    private String priority;

    @Column(name = "message_from_number")
    private String messageFromNumber;

    @Column(name = "message_from")
    private String messageFrom;

    @Column(name = "msg_text")
    private String msgText;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}