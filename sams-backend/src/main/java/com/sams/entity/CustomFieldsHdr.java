package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "m_custom_fields_hdr", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomFieldsHdr {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "custom_fields_hdr_id")
    private Long customFieldsHdrId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "asset_sub_category_id")
    private Long assetSubCategoryId;

    @Column(name = "attribute_name")
    private String attributeName;

    @Column(name = "input_type")
    private String inputType;

    @Column(name = "input_max_length")
    private Long inputMaxLength;

    @Column(name = "based_on")
    private String basedOn;

    @Column(name = "display_group")
    private String displayGroup;

    @Column(name = "display_group_id")
    private Long displayGroupId;

    @Column(name = "color")
    private String color;

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