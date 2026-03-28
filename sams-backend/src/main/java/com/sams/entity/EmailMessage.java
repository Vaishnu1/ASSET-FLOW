package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_message", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_message_id")
    private Long emailMessageId;

    @Column(name = "email_information_id")
    private Long emailInformationId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "message_send")
    private Long messageSend;

    @Column(name = "message_new")
    private Long messageNew;

    @Column(name = "message_delete")
    private Long messageDelete;

    @Column(name = "msg_destination_email_id")
    private String msgDestinationEmailId;

    @Column(name = "msg_destination_ccemail_id")
    private String msgDestinationCcemailId;

    @Column(name = "read_state")
    private Boolean readState;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}