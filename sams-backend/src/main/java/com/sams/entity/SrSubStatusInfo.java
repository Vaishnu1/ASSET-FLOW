package com.sams.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "sr_sub_status_info", schema = "sr")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SrSubStatusInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sr_sub_status_info_id")
    private Long srSubStatusInfoId;

    @Column(name = "org_id")
    private Long orgId;

    @Column(name = "location_id")
    private Long locationId;

    @Column(name = "location_name")
    private String locationName;

    @Column(name = "sr_id")
    private Long srId;

    @Column(name = "sr_no")
    private String srNo;

    @Column(name = "sr_sub_status_id")
    private Long srSubStatusId;

    @Column(name = "sr_sub_status_name")
    private String srSubStatusName;

    @Column(name = "module_ref")
    private String moduleRef;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "trans_id")
    private Long transId;

    @Column(name = "trans_source")
    private String transSource;

    @Column(name = "created_by")
    private String createdBy;

    @Column(name = "created_dt")
    private LocalDateTime createdDt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "updated_dt")
    private LocalDateTime updatedDt;

}