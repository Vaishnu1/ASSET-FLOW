package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "supplier_invoice_tc_info", schema = "accounts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SupplierInvoiceTcInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "supplier_invoice_tc_info_id")
    private Long supplierInvoiceTcInfoId;

    @Column(name = "po_hdr_id")
    private Long poHdrId;

    @Column(name = "supplier_invoice_hdr_id")
    private Long supplierInvoiceHdrId;

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

    @Column(name = "sel_entered_values")
    private String selEnteredValues;

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

}