package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sms_message_dtl", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SmsMessageDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sms_message_dtl_id")
    private Long smsMessageDtlId;

    @Column(name = "sms_message_hdr_id")
    private Long smsMessageHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "message_send")
    private Long messageSend;

    @Column(name = "message_new")
    private Long messageNew;

    @Column(name = "message_delete")
    private Long messageDelete;

    @Column(name = "msg_destination_number")
    private String msgDestinationNumber;

    @Column(name = "msg_destination_name")
    private String msgDestinationName;

    @Column(name = "msg_destination_id")
    private Long msgDestinationId;

    @Column(name = "dnd_category")
    private String dndCategory;

    @Column(name = "msg_count")
    private Long msgCount;

    @Column(name = "reference_text")
    private String referenceText;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "sent_dt")
    private LocalDateTime sentDt;

}