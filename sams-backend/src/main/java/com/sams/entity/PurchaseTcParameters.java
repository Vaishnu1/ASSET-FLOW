package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_purchase_tc_parameters", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PurchaseTcParameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tc_parameter_id")
    private Long tcParameterId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "tc_parameter_name")
    private String tcParameterName;

    @Column(name = "tc_parameter_input_type")
    private String tcParameterInputType;

    @Column(name = "tc_parameter_input_values")
    private String tcParameterInputValues;

    @Column(name = "tc_parameter_remarks")
    private String tcParameterRemarks;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "trigger_event")
    private String triggerEvent;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "tc_parameter_for")
    private String tcParameterFor;

    @Column(name = "is_editable")
    private Boolean isEditable;

}