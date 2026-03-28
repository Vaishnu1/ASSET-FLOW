package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_printer_label_size", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrinterLabelSize {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_label_id")
    private Long printerLabelId;

    @Column(name = "printer_model_id")
    private Long printerModelId;

    @Column(name = "label_size")
    private String labelSize;

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