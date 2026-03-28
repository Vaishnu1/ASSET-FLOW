package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_printer_sub_category_mapping", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrinterSubCategoryMapping {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "printer_sub_category_mapping_id")
    private Long printerSubCategoryMappingId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "printer_model_id")
    private Long printerModelId;

    @Column(name = "printer_label_id")
    private Long printerLabelId;

    @Column(name = "printer_label_template_id")
    private Long printerLabelTemplateId;

    @Column(name = "no_of_labels")
    private Long noOfLabels;

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