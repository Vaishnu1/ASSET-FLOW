package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_custom_fields_dtl", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFieldsDtl {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "custom_fields_dtl_id")
    private Long customFieldsDtlId;

    @Column(name = "custom_fields_hdr_id")
    private Long customFieldsHdrId;

    @Column(name = "custom_fields_values")
    private String customFieldsValues;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}