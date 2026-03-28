package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "contract_type", schema = "asset")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContractType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_type_id")
    private Long contractTypeId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "contract_type_name")
    private String contractTypeName;

    @Column(name = "contract_type_desc")
    private String contractTypeDesc;

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