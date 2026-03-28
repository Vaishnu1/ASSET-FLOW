package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchase_tc_template_dtl", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseTcTemplateDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tc_template_dtl_id")
    private Long tcTemplateDtlId;

    @Column(name = "tc_template_hdr_id")
    private Long tcTemplateHdrId;

    @Column(name = "tc_parameter_id")
    private Long tcParameterId;

    @Column(name = "tc_parameter_name")
    private String tcParameterName;

    @Column(name = "display_sequence_no")
    private Long displaySequenceNo;

    @Column(name = "tc_parameter_child_id")
    private Long tcParameterChildId;

    @Column(name = "tc_parameter_child_name")
    private String tcParameterChildName;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "remarks")
    private String remarks;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "tc_parameter_child_editable")
    private Boolean tcParameterChildEditable;

    @Column(name = "tc_parameter_editable")
    private Boolean tcParameterEditable;

}