package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_printer", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Printer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_id")
    private Long printerId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "printer_name")
    private String printerName;

    @Column(name = "printer_model_id")
    private Long printerModelId;

    @Column(name = "printer_model")
    private String printerModel;

    @Column(name = "printer_manufacturer")
    private String printerManufacturer;

    @Column(name = "communication_type")
    private String communicationType;

    @Column(name = "default_printer")
    private Boolean defaultPrinter;

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