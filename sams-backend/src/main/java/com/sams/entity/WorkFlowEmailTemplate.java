package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_flow_email_template", schema = "workflow")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WorkFlowEmailTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "wf_email_template_id")
    private Long wfEmailTemplateId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "process_id")
    private Long processId;

    @Column(name = "email_template_name")
    private String emailTemplateName;

    @Column(name = "email_subject")
    private String emailSubject;

    @Column(name = "email_body")
    private String emailBody;

    @Column(name = "email_footer")
    private String emailFooter;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}