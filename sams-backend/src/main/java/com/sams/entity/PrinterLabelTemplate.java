package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_printer_label_template", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrinterLabelTemplate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_label_template_id")
    private Long printerLabelTemplateId;

    @Column(name = "printer_model_id")
    private Long printerModelId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "printer_label_id")
    private Long printerLabelId;

    @Column(name = "template_name")
    private String templateName;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "template_path")
    private String templatePath;

    @Column(name = "file_type")
    private String fileType;

    @Column(name = "default_template")
    private Boolean defaultTemplate;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}