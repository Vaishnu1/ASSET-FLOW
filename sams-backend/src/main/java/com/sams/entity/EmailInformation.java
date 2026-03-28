package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_information", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_information_id")
    private Long emailInformationId;

    @Column(name = "priority")
    private String priority;

    @Column(name = "message_from_email")
    private String messageFromEmail;

    @Column(name = "message_to")
    private String messageTo;

    @Column(name = "email_subject")
    private String emailSubject;

    @Column(name = "email_body")
    private String emailBody;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

}