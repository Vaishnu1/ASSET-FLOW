package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_cus_field_hdr", schema = "base")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CusFieldHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "custom_hdr_id")
    private Long customHdrId;

    @Column(name = "custom_field_val_id")
    private Long customFieldValId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "label_name")
    private String labelName;

    @Column(name = "input_type")
    private String inputType;

    @Column(name = "input_max_length")
    private Integer inputMaxLength;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "value")
    private String value;

    @Column(name = "values")
    private String values;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

    @Column(name = "updated_dt_disp")
    private String updatedDtDisp;

    @Column(name = "created_dt_disp")
    private String createdDtDisp;

    @Column(name = "custom_combo_list")
    private String customComboList;

    @Column(name = "asset_custom_field_value")
    private String assetCustomFieldValue;

    @Column(name = "value1")
    private String value1;

    @Column(name = "based_on")
    private String basedOn;

    @Column(name = "based_on_disp")
    private String basedOnDisp;

    @Column(name = "display_group")
    private String displayGroup;

    @Column(name = "color")
    private String color;

    @Column(name = "display_group_id")
    private Long displayGroupId;

    @Column(name = "asset_group_id")
    private Long assetGroupId;

    @Column(name = "model_id")
    private Long modelId;

    @Column(name = "transaction_id")
    private Long transactionId;

    @Column(name = "transaction_src")
    private String transactionSrc;

    @PrePersist
    protected void onCreate() {
       // Auto-generated
    }

    @PreUpdate
    protected void onUpdate() {
       // Auto-generated
    }
}